let level = 0;

const dark_levels = [4,5,8,9,10]

let level_start_y = [350, 450, 250, 560, 200, 390, 290]

const wind_directions = ["down", "left", "up", "right", "none"];

const tool_list = ["Magnet_Drone", "Force-field_Drone", "Lightning_Rod_Drone", "Air_Strike", "Machine_Gun",
"Drone_GPS_Hack", "Recall_Drones", "Repair_Package_Drone"]

const descriptions = [`
Attracts the package drone and
missiles towards it.

- Placeable, redrag from toolbar
to replace. 
- Only one on the field at a time.

- Cooldown: none
`,`
Destroys bullets and missiles, but
can be taken down by attack drones

- Placeable, redrag from toolbar
to replace. 
- Only one on the field at a time.

- Depletes power in 10 seconds
- Cooldown: 15 seconds
`,`
Absorbs lightning in a small radius

- Placeable, redrag from toolbar
to replace. 
- Only one on the field at a time.

- Depletes power in 10 seconds
- Cooldown: 15 seconds
`,`
Call a missile to any point on the field.

- Ammo: 1 missile
- Damage: high
- Cooldown: 3 seconds
`,`
Fires shots at any point on the field,
runs out of ammo after 20 bullets.
Can destroy missiles and drones.

- Ammo: 20 bullets
- Firerate: 4 bullets per second
- Cooldown: 10 seconds
`,`
Locks position of all drones temporarily,
missiles lose heat-seeking function.


-Press to activate
- Duration: 10 seconds
- Cooldown: 20 seconds
`,`
Removes the magnet drone, force-field
drone and lightning-rod drone if they
are placed on the field.

-Press to activate
- Cooldown: none
`,`
When held near package drone, 
restores 3 health every 3 seconds.

- Cooldown: 10 seconds
`,`
Has Dio's special package,
get it to his house somewhere west.

Drag the magnet drone near it to move it.
`,`
Shoots low damage burst shots
in 4 diagonal directions.
`,`
Fires high-damage heat-seeking missiles.
`,`
Will try to ram into you and cut you
with its saws. Deals high damage over
time.
`,`
The boss. Can spawn attack drones
and even summon lightning somehow.
`
]

export {tool_list, descriptions, level, dark_levels, wind_directions ,level_start_y}