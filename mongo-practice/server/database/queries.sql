use solar_farm;

select * from solar_panel;

select id, section, `row`, `column`, year_installed, material, is_tracking 
from solar_panel 
order by section, `row`, `column`;

use solar_farm_test;

call set_known_good_state();

select * from solar_panel;
