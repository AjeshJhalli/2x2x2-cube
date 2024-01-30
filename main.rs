use std::fs;
// BLUE YELLOW RED GREEN WHITE ORANGE

const FRONT: i128 = 1;
const TOP: i128 = 2;
const RIGHT: i128 = 3;
const FRONT_PRIME: i128 = 4;
const TOP_PRIME: i128 = 5;
const RIGHT_PRIME: i128 = 6;
const FRONT2: i128 = 7;
const TOP2: i128 = 8;
const RIGHT2: i128 = 9;


#[derive(Copy, Clone)]
struct Cube {
    front: i32,
    top: i32,
    right: i32,
    back: i32,
    bottom: i32,
    left: i32,
    moves: i128,
    moves_ptr: i8
}

fn main() {

    println!("Generating table...");

    let solved_cube = Cube {
        front: 0xF00000,
        top: 0x0F0000,
        right: 0x00F000,
        back: 0x000F00,
        bottom: 0x0000F0,
        left: 0x00000F,
        moves: 0,
        moves_ptr: 0
    };

    let moves = [FRONT2, TOP2, RIGHT2, FRONT, TOP, RIGHT, FRONT_PRIME, TOP_PRIME,
                 RIGHT_PRIME];

    let mut front_states = std::collections::VecDeque::new();
    let mut state_table = std::collections::HashSet::new();
    let mut state_table_with_moves = std::collections::HashSet::new();

    let mut solved_string: String = solved_cube.front.to_string().to_owned();
    solved_string.push_str(",");
    solved_string.push_str(&solved_cube.top.to_string().to_owned());
    solved_string.push_str(",");
    solved_string.push_str(&solved_cube.right.to_string().to_owned());
    solved_string.push_str(",");
    solved_string.push_str(&solved_cube.back.to_string().to_owned());
    solved_string.push_str(",");
    solved_string.push_str(&solved_cube.bottom.to_string().to_owned());
    solved_string.push_str(",");
    solved_string.push_str(&solved_cube.left.to_string().to_owned());

    state_table.insert(solved_string.clone());

    solved_string.push_str(",");
    solved_string.push_str(&solved_cube.moves.to_string().to_owned());

    front_states.push_back(solved_cube);
    state_table_with_moves.insert(solved_string);

    loop {

        let front_state = *front_states.front().unwrap();
        front_states.pop_front();

        let mut front_prev_move = front_state.moves;

        if front_prev_move & 0xF != 0 {
            while front_prev_move & 0xF0 != 0{
                front_prev_move >>= 4;
            }
        }        

        for i in 0..moves.len() {

            let next_front = match front_prev_move {
                FRONT | FRONT_PRIME | FRONT2 => match moves[i] {
                    TOP2 => turn_top2(front_state),
                    RIGHT2 => turn_right2(front_state),
                    TOP => turn_top(front_state),
                    TOP_PRIME => turn_top_prime(front_state),
                    RIGHT => turn_right(front_state),
                    RIGHT_PRIME => turn_right_prime(front_state),
                    _ => continue,
                },
                TOP | TOP_PRIME | TOP2 => match moves[i] {
                    FRONT2 => turn_front2(front_state),
                    RIGHT2 => turn_right2(front_state),
                    FRONT => turn_front(front_state),
                    FRONT_PRIME => turn_front_prime(front_state),
                    RIGHT => turn_right(front_state),
                    RIGHT_PRIME => turn_right_prime(front_state),
                    _ => continue,
                },
                RIGHT | RIGHT_PRIME | RIGHT2 => match moves[i] {
                    FRONT2 => turn_front2(front_state),
                    TOP2 => turn_top2(front_state),
                    FRONT => turn_front(front_state),
                    FRONT_PRIME => turn_front_prime(front_state),
                    TOP => turn_top(front_state),
                    TOP_PRIME => turn_top_prime(front_state),
                    _ => continue,
                },
                _ => match moves[i] {
                    FRONT2 => turn_front2(front_state),
                    TOP2 => turn_top2(front_state),
                    RIGHT2 => turn_right2(front_state),
                    FRONT => turn_front(front_state),
                    TOP => turn_top(front_state),
                    FRONT_PRIME => turn_front_prime(front_state),
                    TOP_PRIME => turn_top_prime(front_state),
                    RIGHT => turn_right(front_state),
                    RIGHT_PRIME => turn_right_prime(front_state),
                    _ => front_state,
                },
            };

            // if not already in list, then add

            let mut state_string: String = next_front.front.to_string().to_owned();
            state_string.push_str(",");
            state_string.push_str(&next_front.top.to_string().to_owned());
            state_string.push_str(",");
            state_string.push_str(&next_front.right.to_string().to_owned());
            state_string.push_str(",");
            state_string.push_str(&next_front.back.to_string().to_owned());
            state_string.push_str(",");
            state_string.push_str(&next_front.bottom.to_string().to_owned());
            state_string.push_str(",");
            state_string.push_str(&next_front.left.to_string().to_owned());

            if !(state_table.contains(&state_string)) {
                front_states.push_back(next_front);
                state_table.insert(state_string.clone());
            }
            
            state_string.push_str(",");
            state_string.push_str(&next_front.moves.to_string().to_owned());

            state_table_with_moves.insert(state_string.clone());

            if state_table_with_moves.len() >= 3674160 {

                println!("Saving table to file...");
    
                let mut file_string: String = "".to_owned();
                
                for x in state_table_with_moves.iter() {
                    file_string.push_str(x);
                    file_string.push_str("\n");
                }
    
                fs::write("table2-2x2x2.csv", file_string).expect("Unable to write file");
    
                println!("Done");
    
                return;
            }
        }   
    }
}

fn rotate_face_right(num: i32) -> i32 {

    let nibble0 = num & 0xF00000;
    let nibble1 = num & 0x0F0000;
    let nibble2 = num & 0x00F000;
    let nibble3 = num & 0x000F00;
    let nibble4 = num & 0x0000F0;
    let nibble5 = num & 0x00000F;

    (nibble0 >> 1 | nibble0 << 3) & 0xF00000 |
    (nibble1 >> 1 | nibble1 << 3) & 0x0F0000 |
    (nibble2 >> 1 | nibble2 << 3) & 0x00F000 |
    (nibble3 >> 1 | nibble3 << 3) & 0x000F00 |
    (nibble4 >> 1 | nibble4 << 3) & 0x0000F0 |
    (nibble5 >> 1 | nibble5 << 3) & 0x00000F
}

fn rotate_face_left(num: i32) -> i32 {

    let nibble0 = num & 0xF00000;
    let nibble1 = num & 0x0F0000;
    let nibble2 = num & 0x00F000;
    let nibble3 = num & 0x000F00;
    let nibble4 = num & 0x0000F0;
    let nibble5 = num & 0x00000F;

    (nibble0 << 1 | nibble0 >> 3) & 0xF00000 |
    (nibble1 << 1 | nibble1 >> 3) & 0x0F0000 |
    (nibble2 << 1 | nibble2 >> 3) & 0x00F000 |
    (nibble3 << 1 | nibble3 >> 3) & 0x000F00 |
    (nibble4 << 1 | nibble4 >> 3) & 0x0000F0 |
    (nibble5 << 1 | nibble5 >> 3) & 0x00000F
}

fn rotate_face2(num: i32) -> i32 {

    let nibble0 = num & 0xF00000;
    let nibble1 = num & 0x0F0000;
    let nibble2 = num & 0x00F000;
    let nibble3 = num & 0x000F00;
    let nibble4 = num & 0x0000F0;
    let nibble5 = num & 0x00000F;

    (nibble0 << 2 | nibble0 >> 2) & 0xF00000 |
    (nibble1 << 2 | nibble1 >> 2) & 0x0F0000 |
    (nibble2 << 2 | nibble2 >> 2) & 0x00F000 |
    (nibble3 << 2 | nibble3 >> 2) & 0x000F00 |
    (nibble4 << 2 | nibble4 >> 2) & 0x0000F0 |
    (nibble5 << 2 | nibble5 >> 2) & 0x00000F
}

fn turn_front(mut cube: Cube) -> Cube {

    cube.front = rotate_face_right(cube.front);

    let temp_top = cube.top;

    cube.top = cube.top & 0xCCCCCC | (cube.left & 0x666666) >> 1;
    cube.left = cube.left & 0x999999 | (cube.bottom & 0xCCCCCC) >> 1;
    cube.bottom = cube.bottom & 0x333333 | (cube.right & 0x888888) >> 1 | (cube.right & 0x111111) << 3;
    cube.right = cube.right & 0x666666 | (temp_top & 0x111111) << 3 | (temp_top & 0x222222) >> 1;

    cube.moves |= FRONT << cube.moves_ptr;
    cube.moves_ptr += 4;

    cube
}

fn turn_top(mut cube: Cube) -> Cube {

    cube.top = rotate_face_right(cube.top);

    let temp_front = cube.front;

    cube.front = cube.front & 0x333333 | cube.right & 0xCCCCCC;
    cube.right = cube.right & 0x333333 | cube.back & 0xCCCCCC;
    cube.back = cube.back & 0x333333 | cube.left & 0xCCCCCC;
    cube.left = cube.left & 0x333333 | temp_front & 0xCCCCCC;

    cube.moves |= TOP << cube.moves_ptr;
    cube.moves_ptr += 4;

    cube
}

fn turn_right(mut cube: Cube) -> Cube {

    cube.right = rotate_face_right(cube.right);

    let temp_front = cube.front;

    cube.front = cube.front & 0x999999 | cube.bottom & 0x666666;
    cube.bottom = cube.bottom & 0x999999 | (cube.back & 0x888888) >> 2 | (cube.back & 0x111111) << 2;
    cube.back = cube.back & 0x666666 | (cube.top & 0x444444) >> 2 | (cube.top & 0x222222) << 2;
    cube.top = cube.top & 0x999999 | temp_front & 0x666666;

    cube.moves |= RIGHT << cube.moves_ptr;
    cube.moves_ptr += 4;

    cube
}

fn turn_front_prime(mut cube: Cube) -> Cube {

    cube.front = rotate_face_left(cube.front);

    let temp_top = cube.top;

    cube.top = cube.top & 0xCCCCCC | (cube.right & 0x888888) >> 3 | (cube.right & 0x111111) << 1;
    cube.right = cube.right & 0x666666 | (cube.bottom & 0x888888) >> 3 | (cube.bottom & 0x444444) << 1;
    cube.bottom = cube.bottom & 0x333333 | (cube.left & 0x666666) << 1;
    cube.left = cube.left & 0x999999 | (temp_top & 0x333333) << 1;

    cube.moves |= FRONT_PRIME << cube.moves_ptr;
    cube.moves_ptr += 4;

    cube
}

fn turn_top_prime(mut cube: Cube) -> Cube {

    cube.top = rotate_face_left(cube.top);

    let temp_front = cube.front;

    cube.front = cube.front & 0x333333 | cube.left & 0xCCCCCC;
    cube.left = cube.left & 0x333333 | cube.back & 0xCCCCCC;
    cube.back = cube.back & 0x333333 | cube.right & 0xCCCCCC;
    cube.right = cube.right & 0x333333 | temp_front & 0xCCCCCC;

    cube.moves |= TOP_PRIME << cube.moves_ptr;
    cube.moves_ptr += 4;

    cube
}

fn turn_right_prime(mut cube: Cube) -> Cube {
    
    cube.right = rotate_face_left(cube.right);

    let temp_front = cube.front;

    cube.front = cube.front & 0x999999 | cube.top & 0x666666;
    cube.top = cube.top & 0x999999 | (cube.back & 0x888888) >> 2 | (cube.back & 0x111111) << 2;
    cube.back = cube.back & 0x666666 | (cube.bottom & 0x444444) >> 2 | (cube.bottom & 0x222222) << 2;
    cube.bottom = cube.bottom & 0x999999 | temp_front & 0x666666;

    cube.moves |= RIGHT_PRIME << cube.moves_ptr;
    cube.moves_ptr += 4;

    cube
}


fn turn_front2(mut cube: Cube) -> Cube {

    cube.front = rotate_face2(cube.front);

    let temp_top = cube.top;
    let temp_left = cube.left;

    cube.top = cube.top & 0xCCCCCC | (cube.bottom & 0xCCCCCC) >> 2;
    cube.bottom = cube.bottom & 0x333333 | (temp_top & 0x333333) << 2;
    cube.left = cube.left & 0x999999 | (cube.right & 0x888888) >> 2 | (cube.right & 0x111111) << 2;
    cube.right = cube.right & 0x666666 | (temp_left & 0x444444) >> 2 | (temp_left & 0x222222) << 2;

    cube.moves |= FRONT2 << cube.moves_ptr;
    cube.moves_ptr += 4;

    cube
}

fn turn_top2(mut cube: Cube) -> Cube {

    cube.top = rotate_face2(cube.top);

    let temp_front = cube.front;
    let temp_left = cube.left;

    cube.front = cube.front & 0x333333 | cube.back & 0xCCCCCC;
    cube.back = cube.back & 0x333333 | temp_front & 0xCCCCCC;
    cube.left = cube.left & 0x333333 | cube.right & 0xCCCCCC;
    cube.right = cube.right & 0x333333 | temp_left & 0xCCCCCC;

    cube.moves |= TOP2 << cube.moves_ptr;
    cube.moves_ptr += 4;

    cube
}

fn turn_right2(mut cube: Cube) -> Cube {

    cube.right = rotate_face2(cube.right);

    let temp_front = cube.front;
    let temp_bottom = cube.bottom;

    cube.front = cube.front & 0x999999 | (cube.back & 0x888888) >> 2 | (cube.back & 0x111111) << 2;
    cube.back = cube.back & 0x666666 | (temp_front & 0x444444) >> 2 | (temp_front & 0x222222) << 2;
    cube.bottom = cube.bottom & 0x999999 | cube.top & 0x666666;
    cube.top = cube.top & 0x999999 | temp_bottom & 0x666666;

    cube.moves |= RIGHT2 << cube.moves_ptr;
    cube.moves_ptr += 4;

    cube
}
