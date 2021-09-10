// BLUE YELLOW RED GREEN WHITE ORANGE

//const EMPTY: i128 = 0;
const FRONT: i128 = 1;
const TOP: i128 = 2;
const RIGHT: i128 = 3;
const FRONT_PRIME: i128 = 4;
const TOP_PRIME: i128 = 5;
const RIGHT_PRIME: i128 = 6;


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

    let mut initial_cube = turn_top_prime(turn_right(turn_front(turn_top(cube))));
    initial_cube.moves = 0;
    initial_cube.moves_ptr = 0;

    display_cube(initial_cube);

    let mut states = std::collections::VecDeque::new();
    let moves = [FRONT, TOP, RIGHT, FRONT_PRIME, TOP_PRIME, RIGHT_PRIME];

    states.push_back(initial_cube);

    while !states.is_empty() {
        let current_state = *states.front().unwrap();
        states.pop_front();

        if is_solved(current_state) {
            println!("{:014x}", current_state.moves);
            break;
        }

        for i in 0..moves.len() {
            let new_state = match moves[i] {
                FRONT => turn_front(current_state),
                TOP => turn_top(current_state),
                RIGHT => turn_right(current_state),
                FRONT_PRIME => turn_front_prime(current_state),
                TOP_PRIME => turn_top_prime(current_state),
                RIGHT_PRIME => turn_right_prime(current_state),
                _ => current_state,
            };

            states.push_back(new_state);
        }   
    }
}


fn display_cube(cube: Cube) {
    println!("        BYRGWO");
    println!("Front:  {:06x}", cube.front);
    println!("Top:    {:06x}", cube.top);
    println!("Right:  {:06x}", cube.right);
    println!("Back:   {:06x}", cube.back);
    println!("Bottom: {:06x}", cube.bottom);
    println!("Left:   {:06x}", cube.left);
    println!("");
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


fn is_solved(cube: Cube) -> bool {
    cube.front == 0xF00000 &&
    cube.top == 0x0F0000 &&
    cube.right == 0x00F000 &&
    cube.back == 0x000F00 &&
    cube.bottom == 0x0000F0 &&
    cube.left == 0x00000F
}