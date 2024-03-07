let level = 0;

const dark_levels = [4,5,8,9,10]

const wind_directions = ["down", "left", "up", "right", "random"];

const tool_list = ["Magnet_Drone", "Gunner_Drone", "Lightning_Rod_Drone", "Air_Strike", "Machine_Gun",
 "Drone_Control_Hack", "Drone_GPS_Hack", "Recall_Drones", "Repair_Package_Drone"]

const descriptions = [`
Attracts metal towards it

- Placeable & draggable
- Only one on the field at a time

- Cooldown: none
`,`
Shoots things in a small radius

- Placeable & draggable
- Only one on the field at a time

- Ammo: 10 bullets
- Damage: low
- Cooldown: 20 seconds
`,`
Absorbs lightning in a small radius

- Placeable & draggable
- Only one on the field at a time

- Shatters after 3 lightning strikes
- Cooldown: 20 seconds
`,`
Call a missile to any point on the field

- Ammo: 1 missile
- Damage: high
- Cooldown: 10 seconds
`,`
Fires shots at any point on the field,
machine overheats after 20 shots

- Ammo: 20 bullets
- Firerate: 4 bullets per second
- Cooldown: 20 seconds
`,`
Makes drones moveable temporarily,
drag onto desired drone and
drag affected drone to move it

- Duration: 10 seconds
- Cooldown: 30 seconds
`,`
Locks a drone's position temporarily,
drag onto desired drone

- Duration: 10 seconds
- Cooldown: 30 seconds
`,`
Remove all placed drones from field.

- Cooldown: none
`,`
When near package drone, restores
2 health per 5 seconds.

- Cooldown: 30 seconds
`]

export {tool_list, descriptions, level, dark_levels}