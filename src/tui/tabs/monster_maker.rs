use std::io::{BufRead, BufWriter};
use arrayref::array_ref;
use crossterm::event::KeyEvent;
use std::io::Write;
use itertools::Itertools;
use ratatui::{prelude::*, widgets::*};
use tui_textarea::TextArea;

use crate::{render_bottom_bar, tui::THEME, CFG_PATH, WHEAT};


#[derive(Debug, Default, Clone, Copy, PartialEq, Eq)]
pub enum FocusMenu{
    #[default]
    Section,
    Options
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Eq)]
pub enum InputMode{
    #[default]
    Normal,
    Editing
}

#[derive(Debug, Default, Clone)]
pub struct ConfigTab <'a>{
    pub selected_section: usize,
    pub selected_option: usize,
    pub input_mode: InputMode,
    pub focused_menu: FocusMenu,
    pub headers: Vec<String>,
    pub values: Vec<Vec<String>>,
    pub text_areas: Vec<Vec<TextArea<'a>>>,

    pub spaces: Vec<(usize, usize)>
}

impl<'a> ConfigTab<'a>{
    pub fn new(
    ) -> ConfigTab<'a>{
        ConfigTab{
            selected_section: 0,
            selected_option: 0,
            input_mode: InputMode::default(),
            focused_menu: FocusMenu::default(),
            headers: vec![],
            values: vec![],
            text_areas: vec![],
            spaces: vec![],
        }
    }

    pub fn select(&mut self){
        match self.focused_menu{
            FocusMenu::Section => {
                self.focused_menu = FocusMenu::Options;
                self.text_areas[self.selected_section][0].set_block(
                    Block::default()
                    .borders(Borders::ALL)
                    .border_type(BorderType::Plain)
                    .border_style(THEME.selected)
                    .title(self.values[self.selected_section][0].clone())
                    .title_style(THEME.selected)
                    .style(THEME.selected)
                );
                self.text_areas[self.selected_section][self.selected_option].set_style(THEME.selected);
                self.text_areas[self.selected_section][1..].iter_mut().enumerate().for_each(|(ind, ta)| {
                    ta.set_block(
                        Block::default()
                        .borders(Borders::ALL)
                        .border_type(BorderType::Plain)
                        .border_style(THEME.content)
                        .title(self.values[self.selected_section][ind+1].clone())
                        .title_style(THEME.content)
                        .style(THEME.content)
                    );
                    ta.set_style(THEME.content);
                });
            },
            FocusMenu::Options => {
                if self.input_mode == InputMode::Normal{
                    self.input_mode = InputMode::Editing;
                    self.text_areas[self.selected_section][self.selected_option].set_cursor_line_style(THEME.selected.add_modifier(Modifier::UNDERLINED));
                    self.text_areas[self.selected_section][self.selected_option].set_cursor_style(THEME.selected.add_modifier(Modifier::REVERSED));
                }else{
                    self.input_mode = InputMode::Normal;
                    let default_text = self.text_areas[self.selected_section][self.selected_option].lines()[0].clone();
                    self.text_areas[self.selected_section][self.selected_option].set_placeholder_text(default_text.trim());
                    self.text_areas[self.selected_section][self.selected_option].set_block(
                            Block::default()
                            .borders(Borders::ALL)
                            .border_type(BorderType::Plain)
                            .border_style(THEME.selected)
                            .title(self.values[self.selected_section][self.selected_option].clone())
                            .title_style(THEME.selected)
                            .style(THEME.selected)
                        );
                    self.text_areas[self.selected_section][self.selected_option].set_style(THEME.selected);
                    self.text_areas[self.selected_section][self.selected_option].set_cursor_line_style(Style::default());
                    self.text_areas[self.selected_section][self.selected_option].set_cursor_style(Style::default());

                    self.save_to_file()
                }
            }
        }
    }

    pub fn unselect(&mut self){
        match self.focused_menu{
            FocusMenu::Section => {
                // you should never be here. this <config tab> should memoize its state
                // and the wrapper handler in <app> should have already changed tabs
            },
            FocusMenu::Options => {
                if self.input_mode == InputMode::Editing{
                    self.input_mode = InputMode::Normal;
                    let cached_text = self.text_areas[self.selected_section][self.selected_option].placeholder_text().to_string();
                    self.text_areas[self.selected_section][self.selected_option].move_cursor(tui_textarea::CursorMove::Jump(0, 0));
                    self.text_areas[self.selected_section][self.selected_option].delete_line_by_end();
                    self.text_areas[self.selected_section][self.selected_option].insert_str(cached_text);
                    self.text_areas[self.selected_section][self.selected_option].set_block(
                            Block::default()
                            .borders(Borders::ALL)
                            .border_type(BorderType::Plain)
                            .border_style(THEME.selected)
                            .title(self.values[self.selected_section][self.selected_option].clone())
                            .title_style(THEME.selected)
                            .style(THEME.selected)
                        );
                    self.text_areas[self.selected_section][self.selected_option].set_style(THEME.selected);
                    self.text_areas[self.selected_section][self.selected_option].set_cursor_line_style(Style::default());
                    self.text_areas[self.selected_section][self.selected_option].set_cursor_style(Style::default());
                }else{
                    self.focused_menu = FocusMenu::Section;
                    self.selected_option = 0;
                    self.text_areas[self.selected_section].iter_mut().enumerate().for_each(|(ind, ta)| {
                        ta
                        .set_block(
                            Block::default()
                            .borders(Borders::ALL)
                            .border_type(BorderType::Plain)
                            .border_style(THEME.unselected)
                            .title(self.values[self.selected_section][ind].clone())
                            .title_style(THEME.unselected)
                            .style(THEME.unselected)
                        );
                        ta.set_style(THEME.unselected);
                    });
                }
            }
        }
    }

    pub fn write_key(&mut self, key_in: KeyEvent){
        self.text_areas[self.selected_section][self.selected_option].input(key_in);
    }

    pub fn handle_paste(&mut self, str_in: String){
        self.text_areas[self.selected_section][self.selected_option].insert_str(str_in);
    }

    pub fn next_choice(&mut self){

        match self.focused_menu{
            FocusMenu::Section => {
                    self.selected_section = self.selected_section.saturating_add(1) % self.values.len();
            },
            FocusMenu::Options => {

                self.text_areas[self.selected_section][self.selected_option].set_block(
                    Block::default()
                    .borders(Borders::ALL)
                    .border_type(BorderType::Plain)
                    .border_style(THEME.content)
                    .title(self.values[self.selected_section][self.selected_option].clone())
                    .title_style(THEME.content)
                    .style(THEME.content)
                );
                self.text_areas[self.selected_section][self.selected_option].set_style(THEME.content);

                self.selected_option = self.selected_option.saturating_add(1) % self.values[self.selected_section].len();

                self.text_areas[self.selected_section][self.selected_option].set_block(
                    Block::default()
                    .borders(Borders::ALL)
                    .border_type(BorderType::Plain)
                    .border_style(THEME.selected)
                    .title(self.values[self.selected_section][self.selected_option].clone())
                    .title_style(THEME.selected)
                    .style(THEME.selected)
                );
                self.text_areas[self.selected_section][self.selected_option].set_style(THEME.selected);

            }
        }
    }

    pub fn previous_choice(&mut self){

        match self.focused_menu{
            FocusMenu::Section => {
                self.selected_section = self.selected_section.saturating_add(self.values.len() - 1) % self.values.len();
            },
            FocusMenu::Options => {

                self.text_areas[self.selected_section][self.selected_option].set_block(
                    Block::default()
                    .borders(Borders::ALL)
                    .border_type(BorderType::Plain)
                    .border_style(THEME.content)
                    .title(self.values[self.selected_section][self.selected_option].clone())
                    .title_style(THEME.content)
                    .style(THEME.content)
                );
                self.text_areas[self.selected_section][self.selected_option].set_style(THEME.content);

                self.selected_option = self.selected_option.saturating_add(self.values[self.selected_section].len()-1) % self.values[self.selected_section].len();
            
                self.text_areas[self.selected_section][self.selected_option].set_block(
                    Block::default()
                    .borders(Borders::ALL)
                    .border_type(BorderType::Plain)
                    .border_style(THEME.selected)
                    .title(self.values[self.selected_section][self.selected_option].clone())
                    .title_style(THEME.selected)
                    .style(THEME.selected)
                );
                self.text_areas[self.selected_section][self.selected_option].set_style(THEME.selected);

            }
        }
    }

    /////////////////////////////
    ///        LOADING        ///
    /////////////////////////////

    pub fn save_to_file(&mut self){
        let data_file = std::fs::OpenOptions::new()
            .write(true)
            .open(CFG_PATH)
            .expect("cannot open config file");

        let mut file_writer = BufWriter::new(data_file);
    
        let mut spaces_clone = self.spaces.clone();

        for (i, key) in self.headers.iter().enumerate(){
            writeln!(file_writer, "[{}]", key).unwrap();
            for (j, val) in self.values[i].iter().enumerate(){
                writeln!(file_writer, "{} = {}", val, self.text_areas[i][j].lines()[0].trim()).unwrap();
                if spaces_clone.len() > 0{
                    let last_space = spaces_clone[spaces_clone.len()-1];
                    if (i, j) == last_space{
                        writeln!(file_writer, "").unwrap();
                        spaces_clone.pop();
                    }
                }
            }
        }
    }

    pub fn read_file(&mut self){
        let cfg_file = std::fs::File::open(CFG_PATH).unwrap();
        let cfg_file_lines = std::io::BufReader::new(cfg_file).lines();

        let mut text_areas = vec![];
        let mut header_vec: Vec<String> = vec![];
        let mut values_vec: Vec<Vec<String>> = vec![];
        let mut spaces_vec: Vec<(usize, usize)> = vec![];

        for line_res in cfg_file_lines{
            let line = line_res.unwrap();
            if line.len() <= 2 {
                if header_vec.len() > 0{
                    let curr_header_len = header_vec.len()-1;
                    let curr_values_len = values_vec[curr_header_len].len();
                    if curr_values_len == 0{
                        continue;
                    }
                    spaces_vec.push((curr_header_len, curr_values_len-1));
                }
                continue;   
            }
            let mut line_chars = line.chars();
            let first_char = line_chars.next().unwrap();
            let last_char = line_chars.next_back().unwrap();
            if first_char == '[' && last_char == ']'{
                header_vec.push(line_chars.as_str().to_string());
                values_vec.push(vec![]);
                text_areas.push(vec![]);
                continue;
            }

            let kv_vec = line.split("=").collect::<Vec<&str>>();

            // if kv_vec.len() == 1{

            // }

            if kv_vec.len() != 2{
                continue;
            }

            // panic!("KV VEC: {:?}", kv_vec);
            let [key_ref, val_ref] = array_ref![kv_vec, 0, 2];
            let key = key_ref.trim().to_string();
            let val = val_ref.trim().to_string();
            values_vec[header_vec.len()-1].push(key.clone());


            let mut ta = TextArea::new(vec![val.clone()]);
            ta.set_placeholder_text(val);
            ta.set_style(THEME.unselected);
            ta.set_cursor_line_style(Style::default());
            ta.set_cursor_style(Style::default());
            ta.set_block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_type(BorderType::Plain)
                    .border_style(THEME.unselected)
                    .title(key)
                    .title_style(THEME.unselected)
            );

            text_areas[header_vec.len()-1].push(ta)
        }

        self.text_areas = text_areas;
        self.headers = header_vec;
        self.values = values_vec;
        spaces_vec.reverse();
        self.spaces = spaces_vec;
    }

    /////////////////////////////
    ///        RENDER         ///
    /////////////////////////////

    pub fn render(&self, area: Rect, buf: &mut Buffer) {
        Block::new().style(THEME.root).render(area, buf);
        
        let vertical = Layout::vertical([
            Constraint::Min(0),
            Constraint::Length(1),
        ]);
        let [ tab, bottom_bar] = vertical.areas(area);
        render_bottom_bar(bottom_bar, buf);

        
        let horizontal = Layout::horizontal([Constraint::Percentage(35), Constraint::Percentage(65)]);
        let [section_menu, option_menu] = horizontal.areas(tab);

        self.render_sections(section_menu, buf);
        self.render_options(option_menu, buf);
    }

    pub fn render_sections(
        &self,
        area: Rect,
        buf: &mut Buffer
    ) {
        let mut state = ListState::default().with_selected(Some(self.selected_section));

        let items: Vec<ListItem> = self.headers
            .iter()
            .map(|i| {
                ListItem::new(vec![text::Line::from(Span::raw(i))])
            })
            .collect_vec();

        StatefulWidget::render(
            List::new(items)
            .style(
                THEME.content
            )
            .highlight_style(
                THEME.selected
            )
            .highlight_symbol(">")
            .block(
                Block::default()
                .borders(Borders::ALL)
                .border_type(BorderType::Double)
                .border_style(THEME.content)
                .title("Sections".bold().style(Style::new().fg(WHEAT)))
                .title_alignment(Alignment::Left)
            ),
            area,
            buf,
            &mut state,
        );
    }

    pub fn render_options(
        &self,
        area: Rect,
        buf: &mut Buffer
    ) {
        if self.focused_menu == FocusMenu::Options{
            Block::new()
            .title("Options".bold().style(THEME.content))
            .title_alignment(Alignment::Left)
            .style(THEME.content)
            .borders(Borders::ALL)
            .border_type(BorderType::Double)
            .border_style(THEME.content)
            .render(area, buf);
        }else{
            Block::new()
            .title("Options".bold().style(THEME.unselected))
            .title_alignment(Alignment::Left)
            .style(THEME.unselected)
            .borders(Borders::ALL)
            .border_type(BorderType::Double)
            .border_style(THEME.unselected)
            .render(area, buf);
        }

        let inner_area = area.inner(&Margin { horizontal: 1, vertical: 1 });

        let text_area_constraints = Layout::vertical([Constraint::Length(3), Constraint::Length(3), Constraint::Length(3), Constraint::Length(3), Constraint::Length(3), Constraint::Length(3), Constraint::Length(3), Constraint::Length(3)]);
        let chunks: [Rect; 8] = text_area_constraints.areas(inner_area);

        const AREA_LEN: usize = 8;
        const HALF_AREA_LEN_PLUS_ONE: usize = (AREA_LEN/2) + AREA_LEN%2;

        let text_areas_list = &self.text_areas[self.selected_section];
        let text_areas_list_len = self.text_areas[self.selected_section].len();

        // if text_areas_list_len >= 5{
        //     panic!("ta len: {}, values: {:?}", text_areas_list_len, self.values[self.selected_option]);
        // }

        if text_areas_list_len < AREA_LEN{
            for i in 0..text_areas_list_len {
                text_areas_list[i].widget().render(chunks[i], buf);
            }
        }else
        if self.selected_option <= HALF_AREA_LEN_PLUS_ONE{
            // for text_area
            for i in 0..AREA_LEN {
                text_areas_list[i].widget().render(chunks[i], buf);
            }
        }else
        if self.selected_option >= (text_areas_list_len - HALF_AREA_LEN_PLUS_ONE){
            let base = text_areas_list_len-AREA_LEN;
            for i in 0..AREA_LEN {
                text_areas_list[base + i].widget().render(chunks[i], buf);
            }
        }else
        {
            for i in 0..AREA_LEN{
                let base = self.selected_option-(AREA_LEN/2);
                text_areas_list[base + i].widget().render(chunks[i], buf);
            }
        }


    }

}