use ratatui::prelude::*;

pub struct Theme {
    pub root: Style,
    pub content: Style,
    pub selected: Style,
    pub unselected: Style,
    pub error: Style,
    pub description: Style,
    pub description_title: Style,
    pub key_binding: KeyBinding,
}

pub struct KeyBinding {
    pub key: Style,
    pub description: Style,
}

pub struct Config {
    pub ingredients: Style,
    pub ingredients_header: Style,
}

pub const THEME: Theme = Theme {
    root: Style::new().bg(DARK_BLUE),
    content: Style::new().fg(WHEAT),
    selected: Style::new().fg(ORANGE_SELECTION),
    unselected: Style::new().fg(LIGHT_GRAY),
    error: Style::new().fg(RED),
    description: Style::new().fg(LIGHT_GRAY).bg(DARK_BLUE),
    description_title: Style::new().fg(LIGHT_GRAY).add_modifier(Modifier::BOLD),
    
    key_binding: KeyBinding {
        key: Style::new().fg(BLACK).bg(DARK_GRAY),
        description: Style::new().fg(DARK_GRAY).bg(BLACK),
    },
    
};

pub const DARK_BLUE: Color = Color::Rgb(16, 24, 48);
pub const LIGHT_BLUE: Color = Color::Rgb(64, 96, 192);
pub const MID_GREEN: Color = Color::Rgb(135,255,135); // not really white, often #eeeeee
pub const LIGHT_YELLOW: Color = Color::Rgb(192, 192, 96);
pub const LIGHT_GREEN: Color = Color::Rgb(64, 192, 96);
pub const LIGHT_RED: Color = Color::Rgb(192, 96, 96);
pub const RED: Color = Color::Rgb(215, 0, 0);
pub const BLACK: Color = Color::Rgb(8, 8, 8); // not really black, often #080808
pub const DARK_GRAY: Color = Color::Rgb(68, 68, 68);
pub const MID_GRAY: Color = Color::Rgb(128, 128, 128);
pub const LIGHT_GRAY: Color = Color::Rgb(188, 188, 188);
pub const WHITE: Color = Color::Rgb(238, 238, 238); // not really white, often #eeeeee
pub const MAGENTA: Color = Color::Rgb(215,135,255); // not really white, often #eeeeee
pub const WHEAT: Color = Color::Rgb(255,255,175); // not really white, often #eeeeee
pub const ORANGE_SELECTION: Color = Color::Rgb(255,119,0);

// log_sender_chan\.send\(.*?"([\w ]*?)"\.bold\(\)\.truecolor\(255,94,94\)\)
// log_sender_chan.send("[r$1".to_string()