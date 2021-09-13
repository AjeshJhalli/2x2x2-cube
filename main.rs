use std::primitive::str;
use std::env;

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

    let cube = Cube {
        front: 0xF00000,
        top: 0x0F0000,
        right: 0x00F000,
        back: 0x000F00,
        bottom: 0x0000F0,
        left: 0x00000F,
        moves: 0,
        moves_ptr: 0
    };

    let args: Vec<String> = env::args().collect();

    let shuffle = &args[1];

    let mut initial_cube = exec_algorithm(cube, shuffle);
    initial_cube.moves = 0;
    initial_cube.moves_ptr = 0;

    println!("Shuffle: {}", shuffle);
    println!("Solving cube...");

    let moves = [FRONT, TOP, RIGHT, FRONT_PRIME, TOP_PRIME,
                 RIGHT_PRIME, FRONT2, TOP2, RIGHT2];

    let mut states = std::collections::VecDeque::new();
    let mut back_states = std::collections::VecDeque::new();

    states.push_back(initial_cube);
    back_states.push_back(cube);

    loop {
        //println!("{}", states.len());
        let current_state = *states.front().unwrap();
        states.pop_front();

        let current_back_state = *back_states.front().unwrap();
        back_states.pop_front();

        for i in 0..states.len() {
            for j in 0..back_states.len() {
                if states[i].front == back_states[j].front &&
                   states[i].right == back_states[j].right &&
                   states[i].top == back_states[j].top &&
                   states[i].back == back_states[j].back &&
                   states[i].bottom == back_states[j].bottom &&
                   states[i].left == back_states[j].left {

                    print!("Solve: ");
        
                    let pointer = 0xF;

                    for k in 0..7 {
                        let shift_amount = k * 4;
                        let the_move = (states[i].moves & pointer << shift_amount) >> shift_amount;
                        
                        match the_move {
                            FRONT => print!("F "),
                            TOP => print!("U "),
                            RIGHT => print!("R "),
                            FRONT_PRIME => print!("F' "),
                            TOP_PRIME => print!("U' "),
                            RIGHT_PRIME => print!("R' "),
                            FRONT2 => print!("F2 "),
                            TOP2 => print!("U2 "),
                            RIGHT2 => print!("R2 "),
                            _ => break,
                        }
                    }

                    for l in 0..7 {

                        let shift_amount = (6-l) * 4;
                        let the_move = (back_states[j].moves & pointer << shift_amount) >> shift_amount;
                        match the_move {

                            FRONT => print!("F' "),
                            TOP => print!("U' "),
                            RIGHT => print!("R' "),
                            FRONT_PRIME => print!("F "),
                            TOP_PRIME => print!("U "),
                            RIGHT_PRIME => print!("R "),
                            FRONT2 => print!("F2 "),
                            TOP2 => print!("U2 "),
                            RIGHT2 => print!("R2 "),
                            _ => continue,
                        }
                    }

                    println!("");
                    return;
                }
            }
        }

        // if previous move is F, don't do F, F' or F2

        let mut current_state_moves_copy = current_state.moves;

        while current_state_moves_copy & 0xF0 != 0 {
            current_state_moves_copy >>= 4;
        }

        let current_state_prev_move = current_state_moves_copy;

        let mut current_back_state_moves_copy = current_back_state.moves;

        while current_back_state_moves_copy & 0xF0 != 0 {
            current_back_state_moves_copy >>= 4;
        }

        let current_back_state_prev_move = current_back_state_moves_copy;

        //println!("{} {}", current_state_prev_move, current_back_state_prev_move);

        for i in 0..moves.len() {

            let new_state = match current_state_prev_move {
                FRONT | FRONT_PRIME | FRONT2 => match moves[i] {
                    TOP => turn_top(current_state),
                    RIGHT => turn_right(current_state),
                    TOP_PRIME => turn_top_prime(current_state),
                    RIGHT_PRIME => turn_right_prime(current_state),
                    TOP2 => turn_top2(current_state),
                    RIGHT2 => turn_right2(current_state),
                    _ => current_state,
                }
                TOP | TOP_PRIME | TOP2 => match moves[i] {
                    FRONT => turn_front(current_state),
                    RIGHT => turn_right(current_state),
                    FRONT_PRIME => turn_front_prime(current_state),
                    RIGHT_PRIME => turn_right_prime(current_state),
                    FRONT2 => turn_front2(current_state),
                    RIGHT2 => turn_right2(current_state),
                    _ => current_state,
                }
                RIGHT | RIGHT_PRIME | RIGHT2 => match moves[i] {
                    FRONT => turn_front(current_state),
                    TOP => turn_top(current_state),
                    FRONT_PRIME => turn_front_prime(current_state),
                    TOP_PRIME => turn_top_prime(current_state),
                    FRONT2 => turn_front2(current_state),
                    TOP2 => turn_top_prime(current_state),
                    _ => current_state,
                }
                _ => match moves[i] {
                    FRONT => turn_front(current_state),
                    TOP => turn_top(current_state),
                    FRONT_PRIME => turn_front_prime(current_state),
                    TOP_PRIME => turn_top_prime(current_state),
                    FRONT2 => turn_front2(current_state),
                    TOP2 => turn_top_prime(current_state),
                    RIGHT => turn_right(current_state),
                    RIGHT2 => turn_right2(current_state),
                    RIGHT_PRIME => turn_right_prime(current_state),
                    _ => current_state
                },
            };

            states.push_back(new_state);
            
        }   

        for i in 0..moves.len() {

            let new_back_state = match current_back_state_prev_move {
                FRONT | FRONT_PRIME | FRONT2 => match moves[i] {
                    TOP => turn_top(current_back_state),
                    RIGHT => turn_right(current_back_state),
                    TOP_PRIME => turn_top_prime(current_back_state),
                    RIGHT_PRIME => turn_right_prime(current_back_state),
                    TOP2 => turn_top2(current_back_state),
                    RIGHT2 => turn_right2(current_back_state),
                    _ => current_back_state,
                }
                TOP | TOP_PRIME | TOP2 => match moves[i] {
                    FRONT => turn_front(current_back_state),
                    RIGHT => turn_right(current_back_state),
                    FRONT_PRIME => turn_front_prime(current_back_state),
                    RIGHT_PRIME => turn_right_prime(current_back_state),
                    FRONT2 => turn_front2(current_back_state),
                    RIGHT2 => turn_right2(current_back_state),
                    _ => current_back_state,
                }
                RIGHT | RIGHT_PRIME | RIGHT2 => match moves[i] {
                    FRONT => turn_front(current_back_state),
                    TOP => turn_top(current_back_state),
                    FRONT_PRIME => turn_front_prime(current_back_state),
                    TOP_PRIME => turn_top_prime(current_back_state),
                    FRONT2 => turn_front2(current_back_state),
                    TOP2 => turn_top_prime(current_back_state),
                    _ => current_back_state,
                }
                _ => match moves[i] {
                    FRONT => turn_front(current_back_state),
                    TOP => turn_top(current_back_state),
                    FRONT_PRIME => turn_front_prime(current_back_state),
                    TOP_PRIME => turn_top_prime(current_back_state),
                    FRONT2 => turn_front2(current_back_state),
                    TOP2 => turn_top_prime(current_back_state),
                    RIGHT => turn_right(current_back_state),
                    RIGHT2 => turn_right2(current_back_state),
                    RIGHT_PRIME => turn_right_prime(current_back_state),
                    _ => current_back_state
                },
            };

            back_states.push_back(new_back_state);
        }
    }
}

/*
fn display_cube(cube: Cube) {
    println!("        BYRGWO");
    println!("Front:  {:06x}", cube.front);
    println!("Top:    {:06x}", cube.top);
    println!("Right:  {:06x}", cube.right);
    println!("Back:   {:06x}", cube.back);
    println!("Bottom: {:06x}", cube.bottom);
    println!("Left:   {:06x}", cube.left);
    println!("");
}*/

fn exec_algorithm(mut cube: Cube, algorithm: &str) -> Cube {

    for symbol in algorithm.split_whitespace() {
        cube = match symbol {
            "F" => turn_front(cube),
            "U" => turn_top(cube),
            "R" => turn_right(cube),
            "F'" => turn_front_prime(cube),
            "U'" => turn_top_prime(cube),
            "R'" => turn_right_prime(cube),
            "F2" => turn_front2(cube),
            "U2" => turn_top2(cube),
            "R2" => turn_right2(cube),
            _ => cube,
        }
    }

    cube
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

/*
fn is_solved(cube: Cube) -> bool {
    cube.front == 0xF00000 &&
    cube.top == 0x0F0000 &&
    cube.right == 0x00F000 &&
    cube.back == 0x000F00 &&
    cube.bottom == 0x0000F0 &&
    cube.left == 0x00000F
}
*/