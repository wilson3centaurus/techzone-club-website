import math

def get_coordinates():
    easting = float(input("Enter easting coordinate: "))
    northing = float(input("Enter northing coordinate: "))
    return easting, northing

def calculate_distance(coord1, coord2):
    return math.sqrt((coord1[0] - coord2[0])**2 + (coord1[1] - coord2[1])**2)

def calculate_midpoint(coord1, coord2):
    midpoint = ((coord1[0] + coord2[0]) / 2, (coord1[1] + coord2[1]) / 2)
    return midpoint


# Code to get coordinates for Town A
print("Enter coordinates for Town A:")
town_a_coords = get_coordinates()

# Code to get coordinates for Town B
print("Enter coordinates for Town B:")
town_b_coords = get_coordinates()

# Task (a): Calculate distance between Town A and Town B
distance_ab = calculate_distance(town_a_coords, town_b_coords)
print(f"Distance between Town A and Town B: {distance_ab:.2f} meters")

# Task (b): Calculate midpoint coordinates
midpoint_coords = calculate_midpoint(town_a_coords, town_b_coords)
print(f"Midpoint coordinates: {midpoint_coords}")

