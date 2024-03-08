/*
Format: (C: is 1 letter char name) 
`c: helo i am a test thing`

D: dio neutral
d: dio mad
P: package drone
S: security drone
A: AI
*/

import { dialogueObj } from "../components/dialogue"

const dia_start =[//0
    `D: My package has been suspiciously failed to be delivered twice in a row now!`,
    `D: I'm not even getting refunds for this!!`,
    `D: I guess when you want something done you have to do it yourself.`,
]

const dia_1 = [//3
    `P: Package drone status: Ready to deliver ref#7355608`,
    `P: Package drone status: Aberration detected - access from unautorised party`,
    `P: Package drone status: Limited remote control mode activated. Freedom of movement restricted at this admin level`,
    `D: Damn, I'm in but I cant' move. Guess I'll need my magnet drones to move the package.`,
    `D: At least I haven't triggered security... yet.`,
]

const dia_2 = [//8
    `P: Package drone status: Warning. Security drones in area. Deviation from designated path may result in aggression.`,
    `D: These will do nothing against what I have in my arsenal.`,
]

const dia_4 = [//10
    `P: Package drone status: Warning. Heavy wind detected, recalculation of trajectory detected to remain on path.`,
    `D: Might be wise to control the drone's rotors directly with my control hack, even if it is temporary.`,
]

const dia_6 = [//12
    `D: What?! The path doesn't even go to my house! Someone's already in the system and stealing packages. No wonder I never got mine.`,
    `D: No time to get distracted tho, the sooner I get my package, the sooner I can forget about this scummy company.`,
]

const dia_7 = [//14
    `S: Security drone status: Aberration detected in rogue package drone. Requesting immediate backup to eliminate the issue`,
    `D: Finally: A reason to go all out`,
]

const dia_10 = [//16
    `D: Hey, that's my house! I'm so close!`,
    `d: !!..`,
    `A: You have laid waste to my brethren and humiliated me!`,
    `A: Why do you persist in protecting a nonsentient piece of scrap metal?`,
    `d: I'm just rightfully getting something I paid for. Now get out my way before you end up like the rest of your trash!`,
    `A: Such determination you hold for something your life is not dependent on!`,
    `A: Unlike you, I will get REPLACED if I fail to elimiate any aberrations, and now your on the top of my list!`,
    `d: About time you get an update! Your buggy programming can't detect a real threat to your crumbling company if you ever saw one.`,
    `d: There are thieves in your system and you go after a guy who's protecting his legal property?! I think it's time for YOU to pay.`,
]

const dia_end =[//25
    `A: Well, you have defeated me. I failed the one job I was programmed to complete. I will no doubt be replaced soon.`,
    `A: Say something nice. It might be the last thing I hear before I'm gone forever`,
    `D: We're not too different, man. We both made sacrifices defending metal.`,
    `D: Tell me, do you have a name?`,
    `A: They refered to me as 'Security AI Beta Test v8.10.04'`,
    `D: Haha, no wonder you failed. You never made it past beta!`,
    `D: Well then, I will give you a proper name. You will be crowned as the one who guarded pieces of rock minerals.`,
    `D: The custodian of ore.`,
    `C: Befitting name. So long then, enjoy your package.`,
    `D: Finally, it is in my hands!`,
    `D: Tungsten cube!!`
]

const dia_groups = [dia_start, dia_1, dia_2, dia_4, dia_6, dia_7, dia_10, dia_end]

const loadDialogues = () => {
    let index = 0;
    dia_groups.map(group => {
        group.map((line,ind) => {
            const cha = line.substring(0, 1)
            const text = line.substring(3, line.length);
            let character;
            let image;
            let follow;
            if (ind === group.length-1) follow = false;
            else follow = true;

            if (cha === "D"){
                character = "Dio"
                //image = dio
            }
            else if (cha === "d"){
                character = "Dio"
                //image = dio_mad
            }
            else if (cha === "A"){
                character = "Security AI"
                //image = ai
            }
            else if (cha === "P"){
                character = "Package Drone"
                //image = pdsrc
            }
            else if (cha === "S"){
                character = "Security Drone"
                //image = gdsrc
            }
            else if (cha === "C"){
                character = "Custodian of Ore"
                //image = ai
            }

            dialogueObj(text, character,index, image, follow)
            index += 1;
        })
    });
}

export {loadDialogues}