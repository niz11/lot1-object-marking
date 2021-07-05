# ARtworks - Meshroom 3D Scan 

## Things to know before Scanning:

- not all objects can be scanned well
- glass, mirror etc is difficult
- object should be evenly illuminated
- no hard shadows
- take pictures from all perspectives if possible
- use a background that has reference points. (not completely white, e.g. a newspaper)

## Workflow:
Upload the photos to the website and start the process of generating the object.
Now it is possible to inspect the model and decide if it needs further postprocessing

## Postprocessing: 
After finishing the scan, the model can now be downloaded and cleaned up. For the processing the open source program **Blender** is used.

To clean up an object follow these steps, which can also be seen in the [Video Tutorial](https://drive.google.com/file/d/1pnZqhX764Y_ahncYq4H-lMXKaymt63cI/view?usp=sharing):


1. Open Blender 
2. Select the standard cube and press x and remove the object
3. Select camera and delete
4. Import model *file  >import > .obj* or *.glb* (for .obj make sure the .mlt is in the same folder)

5. Right-click object and select *set origin > geometry to origin*
now align in all 3 axis
6. On the left side select the rotate tool. Now on top right select one direction after another and reorient the object so that it faces to the x axis and is straight for all directions

7. Enter the modelling mode at the top and make sure that X-Ray is enabled

 8. Click on the z-direction and select the object as good as you can either with the select box or the lasso. then press cmd + i to invert the selection and hit x to delete the unneeded vertices. Repeat for all 3 directions

9. Clean up the details with  the lasso-tool. In texture mode you can take a look at the model to get a better impression.

10. Set origin again

11. Go to modeling and press a to select all.
Then go to *mesh > clean up > decimate geometry*
in the popup on the bottom left select a factor of 0.1 to minimise the points in the object and therefore minimise the file size. If it looks too bad at 0.1 revert and select a higher value

12. *export> .glb*, include selected objects
13. Upload new file to the website
