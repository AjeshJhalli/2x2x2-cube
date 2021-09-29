/*
Do all possible sets of moves up to 11 moves.
Don't add duplicates.
*/
// BLUE YELLOW RED GREEN WHITE ORANGE

#include <iostream>


const long long FRONT = 1;
const long long UP = 2;
const long long RIGHT = 3;
const long long FRONT_PRIME = 4;
const long long UP_PRIME = 5;
const long long RIGHT_PRIME = 6;
const long long FRONT2 = 7;
const long long UP2 = 8;
const long long RIGHT2 = 9;

struct Cube
{
    int front;
    int up;
    int right;
    int back;
    int bottom;
    int left;
    long long moves;
    char moves_ptr;
};

int main()
{
    Cube solved_cube { 0xF00000, 0x0F0000, 0x00F000,
                       0x000F00, 0x0000F0, 0x00000F, 0, 0 };

    std::cout << "Generating table..." << std::endl;

    int moves[9] = { FRONT2, UP2, RIGHT2, FRONT, UP, RIGHT, FRONT_PRIME, UP_PRIME, RIGHT_PRIME };

    Cube states[3674160];
    states[0] = solved_cube;
    int state_index = 0;
    int assigned = 1;
    Cube next_state;

    for (int m = 0; m < 11; m++)
    {
        Cube state = states[state_index];
        state_index++;

        long long prev_move = state.moves;

        if prev_move & 0xF != 0
            while prev_move & 0xF0 != 0
                prev_move >>= 4;

        for (int i = assigned - 1; i > -1; i--)
        {
            switch (prev_move)
            {
            case FRONT:
            case FRONT_PRIME:
            case FRONT2:

                switch (currentMove)
                {
                case UP:
                    next_state = turn_up(cube);
                    break;
                case UP_PRIME:
                    next_state = turn_up_prime(cube);
                    break;
                case UP2:
                    next_state = turn_up2(cube);
                    break;
                case RIGHT:
                    next_state = turn_right(cube);
                    break;
                case RIGHT_PRIME:
                    next_state = turn_right_prime(cube);
                    break;
                case RIGHT2:
                    next_state = turn_right2(cube);
                    break;
                }
                break;

            case UP:
            case UP_PRIME:
            case UP2:

                switch (currentMove)
                {
                case FRONT:
                    next_state = turn_front(cube);
                    break;
                case FRONT_PRIME:
                    next_state = turn_front_prime(cube);
                    break;
                case FRONT2:
                    next_state = turn_front2(cube);
                    break;
                case RIGHT:
                    next_state = turn_right(cube);
                    break;
                case RIGHT_PRIME:
                    next_state = turn_right_prime(cube);
                    break;
                case RIGHT2:
                    next_state = turn_right2(cube);
                    break;
                }
                break;

            case RIGHT:
            case RIGHT_PRIME:
            case RIGHT2:

                switch (currentMove)
                {
                case FRONT:
                    next_state = turn_front(cube);
                    break;
                case FRONT_PRIME:
                    next_state = turn_front_prime(cube);
                    break;
                case FRONT2:
                    next_state = turn_front2(cube);
                    break;
                case UP:
                    next_state = turn_up(cube);
                    break;
                case UP_PRIME:
                    next_state = turn_up_prime(cube);
                    break;
                case UP2:
                    next_state = turn_up2(cube);
                    break;
                }
                break;

            default:

                switch (currentMove)
                {
                case FRONT:
                    next_state = turn_front(cube);
                    break;
                case FRONT_PRIME:
                    next_state = turn_front_prime(cube);
                    break;
                case FRONT2:
                    next_state = turn_front2(cube);
                    break;
                case UP:
                    next_state = turn_up(cube);
                    break;
                case UP_PRIME:
                    next_state = turn_up_prime(cube);
                    break;
                case UP2:
                    next_state = turn_up2(cube);
                    break;
                case RIGHT:
                    next_state = turn_right(cube);
                    break;
                case RIGHT_PRIME:
                    next_state = turn_right_prime(cube);
                    break;
                case RIGHT2:
                    next_state = turn_right2(cube);
                    break;
                default:
                    next_state = cube;
                    break;
                }
                break;
            }

            if (!contains_state(states, next_state, start_index))
            {
                states[assigned] = next_state;
                assigned++;
            }
        }
    }

    // now save states to file

    std::cout << "Saving table" << std::endl;


    for (int i = start_index; i < assigned; i++)
    {

    }

    std::cout << "Table has been saved" << std::endl;
}

bool contains_state(Cube *states, Cube check_state, int start_index)
{
    for i in start_index..states.len()
        if (states[i].front == check_state.front &&
            states[i].up == check_state.up &&
            states[i].right == check_state.right &&
            states[i].back == check_state.back &&
            states[i].bottom == check_state.bottom &&
            states[i].left == check_state.left)
             return true;

    return false;
}

int rotate_face_right(int num)
{
    int nibble0 = num & 0xF00000;
    int nibble1 = num & 0x0F0000;
    int nibble2 = num & 0x00F000;
    int nibble3 = num & 0x000F00;
    int nibble4 = num & 0x0000F0;
    int nibble5 = num & 0x00000F;

    return (nibble0 >> 1 | nibble0 << 3) & 0xF00000 |
        (nibble1 >> 1 | nibble1 << 3) & 0x0F0000 |
        (nibble2 >> 1 | nibble2 << 3) & 0x00F000 |
        (nibble3 >> 1 | nibble3 << 3) & 0x000F00 |
        (nibble4 >> 1 | nibble4 << 3) & 0x0000F0 |
        (nibble5 >> 1 | nibble5 << 3) & 0x00000F;
}

int rotate_face_left(int num)
{
    int nibble0 = num & 0xF00000;
    int nibble1 = num & 0x0F0000;
    int nibble2 = num & 0x00F000;
    int nibble3 = num & 0x000F00;
    int nibble4 = num & 0x0000F0;
    int nibble5 = num & 0x00000F;

    return (nibble0 << 1 | nibble0 >> 3) & 0xF00000 |
        (nibble1 << 1 | nibble1 >> 3) & 0x0F0000 |
        (nibble2 << 1 | nibble2 >> 3) & 0x00F000 |
        (nibble3 << 1 | nibble3 >> 3) & 0x000F00 |
        (nibble4 << 1 | nibble4 >> 3) & 0x0000F0 |
        (nibble5 << 1 | nibble5 >> 3) & 0x00000F;
}

int rotate_face2(int num)
{
    int nibble0 = num & 0xF00000;
    int nibble1 = num & 0x0F0000;
    int nibble2 = num & 0x00F000;
    int nibble3 = num & 0x000F00;
    int nibble4 = num & 0x0000F0;
    int nibble5 = num & 0x00000F;

    return (nibble0 << 2 | nibble0 >> 2) & 0xF00000 |
        (nibble1 << 2 | nibble1 >> 2) & 0x0F0000 |
        (nibble2 << 2 | nibble2 >> 2) & 0x00F000 |
        (nibble3 << 2 | nibble3 >> 2) & 0x000F00 |
        (nibble4 << 2 | nibble4 >> 2) & 0x0000F0 |
        (nibble5 << 2 | nibble5 >> 2) & 0x00000F;
}

Cube turn_front(Cube cube)
{
    cube.front = rotate_face_right(cube.front);

    int temp_up = cube.up;

    cube.up = cube.up & 0xCCCCCC | (cube.left & 0x666666) >> 1;
    cube.left = cube.left & 0x999999 | (cube.bottom & 0xCCCCCC) >> 1;
    cube.bottom = cube.bottom & 0x333333 | (cube.right & 0x888888) >> 1 | (cube.right & 0x111111) << 3;
    cube.right = cube.right & 0x666666 | (temp_up & 0x111111) << 3 | (temp_up & 0x222222) >> 1;

    cube.moves |= FRONT << cube.moves_ptr;
    cube.moves_ptr += 4;

    return cube;
}

Cube turn_up(Cube cube)
{
    cube.up = rotate_face_right(cube.up);

    int temp_front = cube.front;

    cube.front = cube.front & 0x333333 | cube.right & 0xCCCCCC;
    cube.right = cube.right & 0x333333 | cube.back & 0xCCCCCC;
    cube.back = cube.back & 0x333333 | cube.left & 0xCCCCCC;
    cube.left = cube.left & 0x333333 | temp_front & 0xCCCCCC;

    cube.moves |= UP << cube.moves_ptr;
    cube.moves_ptr += 4;

    return cube;
}

Cube turn_right(Cube cube)
{
    cube.right = rotate_face_right(cube.right);

    int temp_front = cube.front;

    cube.front = cube.front & 0x999999 | cube.bottom & 0x666666;
    cube.bottom = cube.bottom & 0x999999 | (cube.back & 0x888888) >> 2 | (cube.back & 0x111111) << 2;
    cube.back = cube.back & 0x666666 | (cube.up & 0x444444) >> 2 | (cube.up & 0x222222) << 2;
    cube.up = cube.up & 0x999999 | temp_front & 0x666666;

    cube.moves |= RIGHT << cube.moves_ptr;
    cube.moves_ptr += 4;

    return cube;
}

Cube turn_front_prime(Cube cube)
{
    cube.front = rotate_face_left(cube.front);

    int temp_up = cube.up;

    cube.up = cube.up & 0xCCCCCC | (cube.right & 0x888888) >> 3 | (cube.right & 0x111111) << 1;
    cube.right = cube.right & 0x666666 | (cube.bottom & 0x888888) >> 3 | (cube.bottom & 0x444444) << 1;
    cube.bottom = cube.bottom & 0x333333 | (cube.left & 0x666666) << 1;
    cube.left = cube.left & 0x999999 | (temp_up & 0x333333) << 1;

    cube.moves |= FRONT_PRIME << cube.moves_ptr;
    cube.moves_ptr += 4;

    return cube;
}

Cube turn_up_prime(Cube cube)
{
    cube.up = rotate_face_left(cube.up);

    int temp_front = cube.front;

    cube.front = cube.front & 0x333333 | cube.left & 0xCCCCCC;
    cube.left = cube.left & 0x333333 | cube.back & 0xCCCCCC;
    cube.back = cube.back & 0x333333 | cube.right & 0xCCCCCC;
    cube.right = cube.right & 0x333333 | temp_front & 0xCCCCCC;

    cube.moves |= UP_PRIME << cube.moves_ptr;
    cube.moves_ptr += 4;

    return cube;
}

Cube turn_right_prime(Cube cube)
{
    cube.right = rotate_face_left(cube.right);

    int temp_front = cube.front;

    cube.front = cube.front & 0x999999 | cube.up & 0x666666;
    cube.up = cube.up & 0x999999 | (cube.back & 0x888888) >> 2 | (cube.back & 0x111111) << 2;
    cube.back = cube.back & 0x666666 | (cube.bottom & 0x444444) >> 2 | (cube.bottom & 0x222222) << 2;
    cube.bottom = cube.bottom & 0x999999 | temp_front & 0x666666;

    cube.moves |= RIGHT_PRIME << cube.moves_ptr;
    cube.moves_ptr += 4;

    return cube;
}


Cube turn_front2(Cube cube)
{
    cube.front = rotate_face2(cube.front);

    int temp_up = cube.up;
    int temp_left = cube.left;

    cube.up = cube.up & 0xCCCCCC | (cube.bottom & 0xCCCCCC) >> 2;
    cube.bottom = cube.bottom & 0x333333 | (temp_up & 0x333333) << 2;
    cube.left = cube.left & 0x999999 | (cube.right & 0x888888) >> 2 | (cube.right & 0x111111) << 2;
    cube.right = cube.right & 0x666666 | (temp_left & 0x444444) >> 2 | (temp_left & 0x222222) << 2;

    cube.moves |= FRONT2 << cube.moves_ptr;
    cube.moves_ptr += 4;

    return cube;
}

Cube turn_up2(Cube cube)
{
    cube.top = rotate_face2(cube.up);

    int temp_front = cube.front;
    int temp_left = cube.left;

    cube.front = cube.front & 0x333333 | cube.back & 0xCCCCCC;
    cube.back = cube.back & 0x333333 | temp_front & 0xCCCCCC;
    cube.left = cube.left & 0x333333 | cube.right & 0xCCCCCC;
    cube.right = cube.right & 0x333333 | temp_left & 0xCCCCCC;

    cube.moves |= UP2 << cube.moves_ptr;
    cube.moves_ptr += 4;

    return cube;
}

Cube turn_right2(Cube cube)
{
    cube.right = rotate_face2(cube.right);

    int temp_front = cube.front;
    int temp_bottom = cube.bottom;

    cube.front = cube.front & 0x999999 | (cube.back & 0x888888) >> 2 | (cube.back & 0x111111) << 2;
    cube.back = cube.back & 0x666666 | (temp_front & 0x444444) >> 2 | (temp_front & 0x222222) << 2;
    cube.bottom = cube.bottom & 0x999999 | cube.up & 0x666666;
    cube.up = cube.up & 0x999999 | temp_bottom & 0x666666;

    cube.moves |= RIGHT2 << cube.moves_ptr;
    cube.moves_ptr += 4;

    return cube;
}
