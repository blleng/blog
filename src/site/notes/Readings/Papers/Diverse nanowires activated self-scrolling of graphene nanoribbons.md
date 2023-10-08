---
{"tags":["paper/viewed/sciences/chemistry/simulation"],"dg-publish":true,"noteIcon":6,"Journal":"Applied Surface Science","Year":2012,"DOI":"10.1016/j.apsusc.2011.05.122","date":"2023-10-08T15:23","update":"2023-10-08T18:46","permalink":"/readings/papers/diverse-nanowires-activated-self-scrolling-of-graphene-nanoribbons/","dgPassFrontmatter":true,"created":"2023-10-08T15:23","updated":"2023-10-08T18:46"}
---


Diverse nanowires activated self-scrolling of graphene nanoribbons

- Type: Journal Article
- Author: Xia, Dan; Xue, Qingzhong; Yan, Keyou; Lv, Cheng
- Journal: Applied Surface Science
    - Volume: 258
    - Issue: 6
    - Pages: 1964-1970
- Year: 2012
- DOI: 10.1016/j.apsusc.2011.05.122

# Abstract
Diverse nanowires (NWs) activating the self-scrolling of planar graphene (GN) nanoribbons have been studied by using molecular dynamics (MD) simulations. Once the NWs’ radiuses reach a threshold, all the seven NWs, acting as an external force, can initiate the conformational change of the GN nanoribbons, and finally form the core/shell composite NWs. Our simulation found that van der Waals (vdW) force plays an important role in the process of forming core/shell composite NWs. This preparation method of the core/shell composite NWs will open a further development of a broad new class of metal/GN core/shell composite NWs with enhanced properties. And these core/shell structures can be the building blocks of functional nanodevices with unique mechanical, electrical, or optical properties.

# Files and Links
- **Url**: https://www.sciencedirect.com/science/article/pii/S016943321100852X
- **Local Library**: [Zotero](zotero://select/library/items/P3ZQPYMW)

# An Example
Fe nanowires interacts with graphene.

A simulation of the Fe-Graphene system by LAMMPS:

## Input File and Explanation
```
#Fe-Graphene
# settings
 units metal
 #This command sets the style of units used for a simulation. It determines the units of all quantities specified in the input script and data file, as well as quantities output to the screen, log file, and dump files. Typically, this command is used at the very beginning of an input script. See https://docs.lammps.org/units.html
 
 atom_style atomic
 #Define what style of atoms to use in a simulation. This determines what attributes are associated with the atoms. This command must be used before a simulation is setup via a read_data, read_restart, or create_box command. Once a style is assigned, it cannot be changed, so use a style general enough to encompass all attributes. See https://docs.lammps.org/atom_style.html
 
 dimension 3
 #Set the dimensionality of the simulation. By default LAMMPS runs 3d simulations. To run a 2d simulation, this command should be used prior to setting up a simulation box via the create_box or read_data commands. Restart files also store this setting. See https://docs.lammps.org/dimension.html
 
 boundary  s s s
 #Set the style of boundaries for the global simulation box in each dimension. A single letter assigns the same style to both the lower and upper face of the box. Two letters assigns the first style to the lower face and the second style to the upper face. The initial size of the simulation box is set by the read_data, read_restart, or create_box commands. For style _s_, the position of the face is set so as to encompass the atoms in that dimension (shrink-wrapping), no matter how far they move. See https://docs.lammps.org/boundary.html
 
 neighbor 0.3 bin
 #This command sets parameters that affect the building of pairwise neighbor lists. All atom pairs within a neighbor cutoff distance equal to the their force cutoff plus the _skin_ distance are stored in the list. Typically, the larger the skin distance, the less often neighbor lists need to be built, but more pairs must be checked for possible force interactions every timestep. See https://docs.lammps.org/neighbor.html
 
 neigh_modify delay 0
 #This command sets parameters that affect the building and use of pairwise neighbor lists. Depending on what pair interactions and other commands are defined, a simulation may require one or more neighbor lists. The delay setting means never build new lists until at least N steps after the previous build. See https://docs.lammps.org/neigh_modify.html
 
 timestep 0.001
 #Set the timestep size for subsequent molecular dynamics simulations. See https://docs.lammps.org/timestep.html

 # modeling of Fe
 region box block 0 200 0 80 -5 70 units box
 #This command defines a geometric region of space. Various other commands use regions. For example, the region can be filled with atoms via the create_atoms command. Or a bounding box around the region, can be used to define the simulation box via the create_box command. See https://docs.lammps.org/region.html 

 create_box 2 box
 #This command creates a simulation box based on the specified region. Thus a region command must first be used to define a geometric domain. See https://docs.lammps.org/create_box.html
 
 lattice fcc 2.863
 #Define a lattice for use by other commands. In LAMMPS, a lattice is simply a set of points in space, determined by a unit cell with basis atoms, that is replicated infinitely in all dimensions. The arguments of the lattice command can be used to define a wide variety of crystallographic lattices. See https://docs.lammps.org/lattice.html

 region fe cylinder y 15 15 10 0 60 units box
 
 create_atoms 1 region fe

 # modeling of graphene
 lattice custom 2.4768 a1 1.0 0.0 0.0 a2 0.0 1.732 0.0 a3 0.0 0.0 1.3727 &
 basis 0.0 0.33333 0.0 &
 basis 0.0 0.66667 0.0 &
 basis 0.5 0.16667 0.0 &
 basis 0.5 0.83333 0.0
 #A lattice of style custom allows you to specify a1, a2, a3, and a list of basis atoms to put in the unit cell. By default, a1 and a2 and a3 are 3 orthogonal unit vectors (edges of a unit cube). But you can specify them to be of any length and non-orthogonal to each other, so that they describe a tilted parallelepiped. Via the basis keyword you add atoms, one at a time, to the unit cell. Its arguments are fractional coordinates (0.0 <= x,y,z < 1.0). The position vector x of a basis atom within the unit cell is thus a linear combination of the unit cell’s 3 edge vectors, i.e. x = bx a1 + by a2 + bz a3, where bx,by,bz are the 3 values specified for the basis keyword. See https://docs.lammps.org/lattice.html

 region graphene block 5 100 10 70 -1 3 units box
 create_atoms 2 region graphene

 # mass of atoms
 mass 1 56
 mass 2 12

 #group of atoms
 group  fe region fe
 group  graphene region graphene
 #Identify a collection of atoms as belonging to a group. The group ID can then be used in other commands such as fix, compute, dump, or velocity to act on those atoms together. See https://docs.lammps.org/group.html
 
 # save data
 write_data  fe_gp.data
 #Write a data file in text format of the current state of the simulation. Data files can be read by the read data command to begin a simulation. The read_data command also describes their format. See https://docs.lammps.org/write_data.html
 
 #force fields
 pair_style hybrid eam/fs airebo 3.0 lj/cut 10
 #Set the formula(s) LAMMPS uses to compute pairwise interactions. In LAMMPS, pair potentials are defined between pairs of atoms that are within a cutoff distance and the set of active interactions typically changes over time. See https://docs.lammps.org/pair_style.html
 #The hybrid, hybrid/overlay, and hybrid/scaled styles enable the use of multiple pair styles in one simulation. The metal atoms interact with each other via an eam potential, the surface atoms interact with each other via a lj/cut potential, and the metal/surface interaction is also computed via a lj/cut potential.  See https://docs.lammps.org/pair_hybrid.html
 
 pair_coeff * * eam/fs fe.eam.fs Fe NULL
 pair_coeff * * airebo CH.airebo NULL C
 pair_coeff 1 2 lj/cut 0.043 2.221

 # output 
 thermo 50
 #Compute and print thermodynamic info (e.g. temperature, energy, pressure) on timesteps that are a multiple of N and at the beginning and end of a simulation. A value of 0 will only print thermodynamics at the beginning and end. See https://docs.lammps.org/thermo.html
 
 dump 1 all atom 200 fe_gp.xyz
 #Dump a snapshot of quantities to one or more files once every N timesteps in one of several styles. The timesteps on which dump output is written can also be controlled by a variable. See https://docs.lammps.org/dump.html

 #temp initiation
 velocity graphene create 300 878743
 #Set or change the velocities of a group of atoms in one of several styles. For each style, there are required arguments and optional keyword/value parameters. The create style generates an ensemble of velocities using a random number generator with the specified seed at the specified temperature. See https://docs.lammps.org/velocity.html
 
 #fix Fe
 fix 1 fe setforce 0 0 0
 #Set a fix that will be applied to a group of atoms. See https://docs.lammps.org/fix.html
 
 fix 2 all nve
 #Perform plain time integration to update position and velocity for atoms in the group each timestep. This creates a system trajectory consistent with the microcanonical ensemble (NVE) provided there are (full) periodic boundary conditions and no other “manipulations” of the system (e.g. fixes that modify forces or velocities). See https://docs.lammps.org/fix_nve.html
 
 run 12000
 #Run or continue dynamics for a specified number of timesteps. See https://docs.lammps.org/run.html
```

Simulation Results

### Model Showcase

Fe nanowire and graphene
![Fe_Graphene](https://cdn.jsdelivr.net/gh/blleng/images/upload/Fe_Graphene_origin.png)

### OVITO Display

![fe_graphene_gif](https://cdn.jsdelivr.net/gh/blleng/images/upload/fe_graphene.gif)

