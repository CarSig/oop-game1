## PLAN

## done:

- movement
- rotating fo turret
- shooting
- obstacles
- collision tank obstacle & bullet obstacle

## to do:

- hit points - dmg
- create enemies

## extras:

## fixes:

- bullet shooting direction
- bullet shooting start position

##

## Questions:

1.)detect collision checks with interval. Once collision detected, how to check when condition stops - idea for now .. object have attribute has collided --- done for bullets
2.) How to make class turret inherits x and y postion from class Tank (currently player)

##

## brainstorm

obstacles (UFO class) appeara at random side of the screen and move in random direction.
once it gets of the board, it is destoryed

Static obstacles will be renamed Buildings -

if UFO collides with builidng it is destroyed but damages building

main building is in the centre . if it is destroyed game over

## COLLISIONS

## Tank

- building - stops tank
- UFO - damages tank, destroys UFO

## UFO

- bullet - damages or destroys it
- building - UFO destroyed - buidling damaged
- tank - damages tank, destroys UFO
