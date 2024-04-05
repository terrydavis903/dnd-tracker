use std::time::Duration;

use color_eyre::{eyre::Context, Result};
use crossterm::event::{Event, KeyCode, KeyEvent, KeyEventKind, KeyModifiers};
use itertools::Itertools;
use ratatui::prelude::*;
use strum::{Display, EnumIter, FromRepr};

use crate::{tui::{tabs::*, term, THEME}, FINISHED_BOOL, MAGENTA};

pub const ANITA_LOGO: [&str; 6] = [
    " █████╗  ███╗   ██╗██╗ ████████╗ █████╗",
    "██╔══██╗ ████╗  ██║██║ ╚══██╔══╝██╔══██╗",
    "███████║ ██╔██╗ ██║██║    ██║   ███████║",
    "██╔══██║ ██║╚██╗██║██║    ██║   ██╔══██║",
    "██║  ██║ ██║ ╚████║██║    ██║   ██║  ██║",
    "╚═╝  ╚═╝ ╚═╝  ╚═══╝╚═╝    ╚═╝   ╚═╝  ╚═╝",
];

pub fn render_logo(area: Rect, buf: &mut Buffer) {
    
    for (y, line1) in ANITA_LOGO.iter().enumerate() {
        for (x, ch1) in line1.chars().enumerate() {
            let x = area.left() + x as u16;
            let y = area.top() + y as u16;
            let cell = buf.get_mut(x, y);
            cell.set_char(ch1);
            cell.fg = MAGENTA;
        }
    }
}


#[derive(Debug, Default)]
pub struct App{
    mode: Mode,
    tab: Tab,
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Eq)]
enum Mode {
    #[default]
    Running,
    Quit,
}

#[derive(Debug, Clone, Copy, Default, Display, EnumIter, FromRepr, PartialEq, Eq)]
enum Tab {
    #[default]
    Landing,
    Execution,
    Config,
}


impl App{
    // pub fn new(
    // ) -> App{
    //     App{
    //         mode: Mode::default(),
    //         tab: Tab::default(),
    //     }
    // }

    /// Run the app until the user quits.
    pub fn run(&mut self,
        terminal: &mut Terminal<impl Backend>,
        mut landing_tab: LandingTab,
        mut config_tab: ConfigTab,
        mut execution_tab: ExecutionTab,

    ) -> Result<()> {
        while self.is_running() {

            self.handle_events(&mut landing_tab, &mut config_tab, &mut execution_tab)?;
            

            execution_tab.update_message_logs();
            execution_tab.update_pos_stats();
            execution_tab.update_buy_stats();
            execution_tab.update_buy_jito_stats();
            execution_tab.update_sell_stats();
            execution_tab.update_sell_jito_stats();

            terminal
            .draw(|frame| {
                
                match self.tab{
                    Tab::Landing => {
                        landing_tab.render(frame.size(), frame.buffer_mut())
                    },
                    Tab::Execution => {
                        execution_tab.render(frame.size(), frame.buffer_mut())
                    },
                    Tab::Config => {
                        config_tab.render(frame.size(), frame.buffer_mut())
                    },
                };
                
            })
            .wrap_err("terminal.draw")?;
            
            // FLAG FLAG
            
        }
        Ok(())
    }

    fn is_running(&self) -> bool {
        self.mode != Mode::Quit
    }

    

    /// Handle events from the terminal.
    ///
    /// This function is called once per frame, The events are polled from the stdin with timeout of
    /// 1/50th of a second. This was chosen to try to match the default frame rate of a GIF in VHS.
    fn handle_events(&mut self, landing_tab: &mut LandingTab, config_tab: &mut ConfigTab, execution_tab: &mut ExecutionTab) -> Result<()> {
        // let timeout = Duration::from_secs_f64(1.0 / 50.0);
        let timeout = Duration::from_millis(50);
        match term::next_event(timeout)? {
            Some(Event::Key(key)) if key.kind == KeyEventKind::Press => self.handle_key_press(key, landing_tab, config_tab, execution_tab),
            Some(Event::Paste(paste_str)) => self.handle_paste_string(paste_str, config_tab, execution_tab),
            
            _ => Ok(()),
        }
    }

    fn handle_paste_string(&mut self, str_in: String, config_tab: &mut ConfigTab, execution_tab: &mut ExecutionTab) -> Result<()>{
        match self.tab{
            self::Tab::Landing => {},
            self::Tab::Execution => {
                execution_tab.handle_paste(str_in);
            },
            self::Tab::Config => {
                if config_tab.input_mode == InputMode::Editing{
                    config_tab.handle_paste(str_in);
                }
            },
        }
        Ok(())
    }
    
    fn handle_key_press(&mut self, key: KeyEvent, landing_tab: &mut LandingTab, config_tab: &mut ConfigTab, execution_tab: &mut ExecutionTab) -> Result<()> {
        use KeyCode::*;
        match key.code {
            
            Left => {
                match self.tab{
                    self::Tab::Landing => {},
                    self::Tab::Execution => {
                        execution_tab.write_key(key);
                    },
                    self::Tab::Config => {
                        if config_tab.input_mode == InputMode::Editing{
                            config_tab.write_key(key);
                        }else{
                            match config_tab.focused_menu{
                                FocusMenu::Section => {
                                    config_tab.save_to_file();
                                    self.tab = self::Tab::Landing;
                                },
                                FocusMenu::Options => config_tab.unselect(),
                            }
                        }
                    },
                }
            },
            Right => {
                match self.tab{
                    self::Tab::Landing => {
                        match landing_tab.option{
                            0 => {
                                if FINISHED_BOOL.load(std::sync::atomic::Ordering::SeqCst){
                                    execution_tab.start_amm_app();
                                };
                                self.tab = self::Tab::Execution;
                            },
                            1 => {
                                if FINISHED_BOOL.load(std::sync::atomic::Ordering::SeqCst){
                                    execution_tab.start_amm_stealth_app();
                                };
                                self.tab = self::Tab::Execution;
                            },
                            2 => {
                                if FINISHED_BOOL.load(std::sync::atomic::Ordering::SeqCst){
                                    execution_tab.start_lmnft_app();
                                };
                                self.tab = self::Tab::Execution;
                            },
                            // 3 => {
                            //     if FINISHED_BOOL.load(std::sync::atomic::Ordering::SeqCst){
                            //         execution_tab.start_eden_app();
                            //     };
                            //     self.tab = self::Tab::Execution;
                            // },
                            3 => {
                                if FINISHED_BOOL.load(std::sync::atomic::Ordering::SeqCst){
                                    execution_tab.start_afk_app();
                                };
                                self.tab = self::Tab::Execution;
                            },
                            5 => {
                                config_tab.read_file();
                                self.tab = self::Tab::Config;
                            },
                            _ => {},
                        }
                    },
                    self::Tab::Execution => {
                        execution_tab.write_key(key);
                    },
                    self::Tab::Config => {
                        if config_tab.input_mode == InputMode::Editing{
                            config_tab.write_key(key);
                        }else if config_tab.focused_menu == FocusMenu::Section{
                            config_tab.select()
                        }
                    },
                }
            },
            Up => {
                match self.tab{
                    self::Tab::Landing => {
                        landing_tab.prev_opt()
                    },
                    self::Tab::Execution => {},
                    self::Tab::Config => {
                        if config_tab.input_mode == InputMode::Editing{

                        }else{
                            config_tab.previous_choice()
                        }
                    },
                }
            },
            Down => {
                match self.tab{
                    self::Tab::Landing => {
                        landing_tab.next_opt()                  
                    },
                    self::Tab::Execution => {},
                    self::Tab::Config => {
                        if config_tab.input_mode == InputMode::Editing{

                        }else{
                            config_tab.next_choice()
                        }
                    },
                }
            },
            Esc => {
                match self.tab{
                    self::Tab::Landing => {
                    },
                    self::Tab::Execution => {
                        execution_tab.clear_input();
                        if FINISHED_BOOL.load(std::sync::atomic::Ordering::SeqCst){
                            execution_tab.end_app();
                            execution_tab.clear_logs();
                        };
                        self.tab = self::Tab::Landing;
                    },
                    self::Tab::Config => {
                        match config_tab.focused_menu{
                            FocusMenu::Section => {
                                config_tab.save_to_file();
                                self.tab = self::Tab::Landing;
                            },
                            FocusMenu::Options => config_tab.unselect(),
                        }
                    },
                }
            },
            Enter => {
                match self.tab{
                    self::Tab::Landing => {
                        match landing_tab.option{
                            0 => {
                                if FINISHED_BOOL.load(std::sync::atomic::Ordering::SeqCst){
                                    execution_tab.start_amm_app();
                                };
                                self.tab = self::Tab::Execution;
                            },
                            1 => {
                                if FINISHED_BOOL.load(std::sync::atomic::Ordering::SeqCst){
                                    execution_tab.start_amm_stealth_app();
                                };
                                self.tab = self::Tab::Execution;
                            },
                            2 => {
                                if FINISHED_BOOL.load(std::sync::atomic::Ordering::SeqCst){
                                    execution_tab.start_lmnft_app();
                                };
                                self.tab = self::Tab::Execution;
                            },
                            // 3 => {
                            //     if FINISHED_BOOL.load(std::sync::atomic::Ordering::SeqCst){
                            //         execution_tab.start_eden_app();
                            //     };
                            //     self.tab = self::Tab::Execution;
                            // },
                            3 => {
                                if FINISHED_BOOL.load(std::sync::atomic::Ordering::SeqCst){
                                    execution_tab.start_afk_app();
                                };
                                self.tab = self::Tab::Execution;
                            },
                            5 => {
                                config_tab.read_file();
                                self.tab = self::Tab::Config;
                            },
                            _ => {},
                        }
                    },
                    self::Tab::Execution => {
                        execution_tab.submit_line();
                    },
                    self::Tab::Config => {
                        config_tab.select()
                    },
                }
            },
            Char('c') => {
                if key.modifiers.contains(KeyModifiers::CONTROL){
                    self.mode = Mode::Quit
                }else{
                    match self.tab{
                        self::Tab::Landing => {},
                        self::Tab::Execution => {
                            execution_tab.write_key(key);
                        },
                        self::Tab::Config => {
                            if config_tab.input_mode == InputMode::Editing{
                                config_tab.write_key(key);
                            }
                        },
                    }
                }
            },
            _ => {
                match self.tab{
                    self::Tab::Landing => {},
                    self::Tab::Execution => {
                        execution_tab.write_key(key);
                    },
                    self::Tab::Config => {
                        if config_tab.input_mode == InputMode::Editing{
                            config_tab.write_key(key);
                        }
                    },
                }
            }
        };
        Ok(())
    }

    
}

/// Implement Widget for &App rather than for App as we would otherwise have to clone or copy the
/// entire app state on every frame. For this example, the app state is small enough that it doesn't
/// matter, but for larger apps this can be a significant performance improvement.
// impl Widget for &App<'_>{
//     fn render(self, area: Rect, buf: &mut Buffer) {
//         render_bottom_bar(area, buf);
//     }
// }

pub fn render_bottom_bar(area: Rect, buf: &mut Buffer) {
    let keys = [
        ("←", "Left"),
        ("→", "Right"),
        ("↑", "Up"),
        ("↓", "Down"),
        ("↩", "Enter"),
        ("Esc", "Escape"),
        ("Ctrl C", "Quit"),
    ];
    let spans = keys
        .iter()
        .flat_map(|(key, desc)| {
            let key = Span::styled(format!(" {} ", key), THEME.key_binding.key);
            let desc = Span::styled(format!(" {} ", desc), THEME.key_binding.description);
            [key, desc]
        })
        .collect_vec();
    Line::from(spans)
        .centered()
        .style((Color::Indexed(236), Color::Indexed(232)))
        .render(area, buf);
}