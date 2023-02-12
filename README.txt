Welcome to the U of T iSchool INF1005 - 118 Project - D&D Character Generator!
Author: Arthur (ZiYu) Zhao

Git Repository: https://github.com/supremeaz/CharGen

To run the application, use the command: 

node CharGenCLI

This Node application runs on the CLI and has the following capabilities: 

1. Generate a new character entirely randomly

2. Create a new character from scratch
- For the attributes: Name, Race, Class, Affliation, Background, and Stats, you can choose your own, or randomize. 
- For stat allocation, the D&D rules are used where 7 dies are rolled and the lowest value discarded.
	- You are able to re-roll the dies until you get a set that you are satisfied with
	- You can then assign each of the rolls from the set to an attribute of your choice!

3. View current character

4. Export the current character to the CharacterDirectory folder, as a JSON file. 

5. Import an existing character from the CharacterDirectory folder using a menu option.

For questions, please contact: arthurzy.zhao@mail.utoronto.ca