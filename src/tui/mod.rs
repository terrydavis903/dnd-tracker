pub mod app;
pub use app::*;

pub mod term;
pub use term::*;

pub mod errors;
pub use errors::*;

pub mod tabs;
pub use tabs::*;

pub mod theme;
pub use theme::*;

use color_eyre::Result;

pub fn tui_loop(
    // buy_cmd_send_chan: tokio::sync::watch::Sender<u64>,
    cmd_send_chan: tokio::sync::watch::Sender<String>,
    log_rec_chan: crossbeam::channel::Receiver<String>,

    buy_stats_in_chan: crossbeam::channel::Receiver<(u64, u64)>,
    buy_jito_stats_in_chan: crossbeam::channel::Receiver<(u64, u64)>,
    sell_stats_in_chan: crossbeam::channel::Receiver<(u64, u64)>,
    sell_jito_stats_in_chan: crossbeam::channel::Receiver<(u64, u64)>,
    pos_stats_in_chan: crossbeam::channel::Receiver<(String, String, String, String, String, String)>,
) -> Result<()>{
    errors::init_hooks()?;
    let terminal = &mut term::init()?;

    #[cfg(target_os = "windows")]
    crate::enable_ansi_support().unwrap();
    let landing_tab_init = LandingTab::default();
    let conf_tab_init =  ConfigTab::new(); // enviroment_current_values, buy_sell_current_values, order_current_values, jito_current_values
    let exec_tab_init = ExecutionTab::new(
        cmd_send_chan,

        buy_stats_in_chan,
        buy_jito_stats_in_chan,
        sell_stats_in_chan,
        sell_jito_stats_in_chan,
        pos_stats_in_chan,

        log_rec_chan
    );

    App::default().run(terminal, landing_tab_init, conf_tab_init, exec_tab_init)?;
    term::restore()?;
    Ok(())
}