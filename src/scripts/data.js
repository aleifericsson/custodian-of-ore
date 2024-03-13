let level = 0;

const dark_levels = [4,5,8,9,10]

let level_start_y = [350, 450, 250, 560, 200, 350, 270]

const wind_directions = ["down", "left", "up", "right", "random"];

const tool_list = ["Magnet_Drone", "Force-field_Drone", "Lightning_Rod_Drone", "Air_Strike", "Machine_Gun",
"Drone_GPS_Hack", "Recall_Drones", "Repair_Package_Drone"]

const descriptions = [`
Attracts metal towards it

- Placeable
- Only one on the field at a time

- Cooldown: none
`,`
Dissolves bullets and missiles it touches,
but can be taken down by attack drones

- Placeable
- Only one on the field at a time

- Depletes power in 10 seconds
- Cooldown: 15 seconds
`,`
Absorbs lightning in a small radius

- Placeable
- Only one on the field at a time

- Depletes power in 10 seconds
- Cooldown: 15 seconds
`,`
Call a missile to any point on the field

- Ammo: 1 missile
- Damage: high
- Cooldown: 3 seconds
`,`
Fires shots at any point on the field,
machine overheats after 20 shots

- Ammo: 20 bullets
- Firerate: 4 bullets per second
- Cooldown: 10 seconds
`,`
Locks position of all drones temporarily,
missiles lose heat-seeking function.

- Duration: 10 seconds
- Cooldown: 20 seconds
`,`
Remove all placed drones from field.

- Cooldown: none
`,`
When held near package drone, 
restores 2 health every 4 seconds.

- Cooldown: 20 seconds
`,`
Has Dio's special package,
get it to his house somewhere west.
`,`
Shoots low damage burst shots
in 4 diagonal directions.
`,`
Fires heat-seeking missiles
or torpedoes,  tboth are high damage.
`,`
Will try to ram into you and cut you
with its saws. Longer contact means
more damage.
`,`
The boss. Can spawn attack drones
and even summon lightning somehow.
`
]

export {tool_list, descriptions, level, dark_levels, wind_directions ,level_start_y}