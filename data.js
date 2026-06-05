/*╔══════════════════════════════════════════════════════════╗
  ║  data.js — project content                              ║
  ║                                                          ║
  ║  projectData   — title → description text               ║
  ║  imageLayouts  — title → array of image blocks          ║
  ║                                                          ║
  ║  Block types:                                            ║
  ║  { type:'image',     src, caption, size }                ║
  ║  { type:'video',     src, caption }                      ║
  ║  { type:'overlap',   back, front, caption }              ║
  ║  { type:'slideshow', slides:[...], caption }             ║
  ║  { type:'sidebyside',left, right, caption }              ║
  ║  { type:'placeholder', label, caption, size }            ║
  ║                                                          ║
  ║  size options: 'full-bleed' | 'small' | 'small right'   ║
  ║                | 'small center'                          ║
  ╚══════════════════════════════════════════════════════════╝*/

/*╔══════════════════════════════════════════════════════════╗
  ║  PROJECT DESCRIPTIONS                                    ║
  ╚══════════════════════════════════════════════════════════╝*/
  
  const projectData = {

  /* CODE ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/
    'Bad Apple':
      'Generative collage created in Processing with the scans of my print archive. Created in a two-day generative collage workshop hosted by Peter Ha of Equal Parts Studio through Recess Community.',
  
    'Syntax of a Firework':
      'An interactive firework simulator built in JavaScript! Using loops, interaction, and collision detection, I developed a particle system that generates firework-like bursts through a balance of deterministic structure and randomness. Click this <a href="https://shinakang.github.io/fireworks/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:2px;"> link</a> to create your own firework!',
  
    'Unicorns':
      'Endless artwork generator. Click <a href="https://shinakang.github.io/unicorn/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:2px;"> here↗</a> to generate your own!',
  
  /* PHOTOGRAPHY ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/
    
    'Mirage of Nostalgia':
      '<p>Just like a mirage, nostalgia is an illusion—seductive yet ultimately unattainable.</p><p>This portrait uses my sister as a personification of nostalgia. Her proximity and subtly withdrawn gaze suggest how nostalgia can obscure perception of the past, drawing the viewer into a dreamlike state anchored in memory.<p></p>The image is constructed through experimentation with long exposure, lighting, and reflective materials, including natural light, spotlights, disco ball reflections, and glitter from my childhood collection. The glitter, in particular, operates as a key visual and conceptual device—luminous and precious at first glance, yet fundamentally composed of small fragments of plastic. This tension mirrors nostalgia itself: visually seductive on the surface, but fragile and insubstantial beneath.',

    'Nocturnal Ritual':
      '<p>Nocturnal Ritual captures the secret, nightly, mythical assembly of flowers in a garden. Gathering only in darkness, free from perceptible light and the presence of visitors, the flowers are momentarily liberated to gather as they please, away from the need to perform.</p><p>Composed from flora photographed in Allan Gardens, the work collages multiple species into a single, impossible bouquet. Vibrant colours appear luminous against the deep black background, emphasizing each flower’s form. The darkness heightens their glow, allowing the shapes, textures, and hues to stand distinctly on their own.</p><p></p>The white oval frame enclosing the composition introduces a juxtaposed condition. Acting as a contemporary reinterpretation of vintage botanical paintings, it simultaneously preserves and exhibits this secret ritual. In doing so, the work introduces another layer of objectification and exploitation—humans observing what is meant to remain a private, hidden escapade of the flowers.',

  /* ILLUSTRATION ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/
  
  
  /* GRAPHIC DESIGN ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/
    'Milk Room':
      '<p>Designed for Bunya Muchaeva’s first solo exhibition, <em>Milk Room</em>, this series of posters embodies Bunya’s sterile, sensual, and restrained aesthetic through the use of organic forms and visual restraint.',

    'On Dreams':
      '<p>Bringing together 25 distinct stories, <em>On Dreams</em> explores dreaming as a tool for reflection, resistance, and reimagining reality.<p>As the art director, I built the visual system, designed the cover and spreads, and oversaw the design team and production. This project marked an early experience in leading a volunteer team with mixed design backgrounds, challenging me to translate abstract ideas into clear, flexible guidelines.',

    'Field of Dreams Collection':
      '<p>Created for Junkie Studio, this collection translates the studio’s identity and the co-founders’ sensibilities into a whimsical Fluxus-informed system of motion-based objects that prioritizes process over finality, positioning the work as an evolving narrative between past, present, and future.<p>Drawing from the studio’s values of craft, play, and storytelling, the collection incorporates motifs such as clovers, shooting stars, playful animal characters, and hand-drawn typography. Frame-by-frame animation is foregrounded to emphasize process and evolution while introducing an element of interactivity that allows users to spin the umbrellas, extending the system into a participatory experience.',
    
    'F Newsmagazine':
      '<p>F Newsmagazine is The School of the Art Insitute of Chicago’s student edited and designed newspaper on arts, culture, and politics. During my time as a staff designer, I had the pleasure of assisting the art direction of the October 2023 issue, creating the covers for October and November 2023 issues, and creating various editorial spreads and web illustrations. <p>Also as the Engagement Coordinator, I developed a structured social media system to organize and standardize previously inconsistent content, along with designing promotional posters.<p>Through this work, I received 1st Place in Advertisement (Digital Ad) and 2nd Place in Opinion Page from the Illinois College Press Association Awards.<p>✄ ◦ ◦ ◦<p>For the October issue, I worked as an associate art director to support the development of the publication’s visual direction. Joining at the start of the semester as an overwhelmed freshman student, this cover was designed to remind other students of the warmth that can be found in the familiar. It also explored an interactive collage component, allowing readers to customize their own sweaters with cut-out buttons.',

    'Taste the Story':
      '<p>Taste the Story is a collection of 10 condiment packets designed during my study abroad trip to Siena, Italy. Inspired by the large number of sugar packets I accumulated throughout the trip, I was intrigued by the intimate moment created when opening the packets for consumption. <p>Each of the packets are designed with locations that I have traveled to alone and contain a thought or question that came to mind during the fleeting moment. As the consumer strips away the packaging for a short blurb, they are invited to experience the locations through my inner workings. The nutrition facts and allergy advices are customized to describe the specifics of the story, creating depth to the user experience.',

    'Invisible Cities':
      '<p>A multilingual book project exploring the development of a cohesive type system that integrates both English and Italian throughout the publication.<p>Drawing from my experience reading English–Korean Bibles, where side-by-side language placement often disrupted reading flow, I developed an unconventional horizontal composition that allows both languages to coexist clearly and harmoniously without visual confusion. Transparency became a recurring design motif throughout this book. Transparent mylar sheets were used as dividers to add a sense of layering and depth. For the cover, I hand embroidered a “transparent” city on a thick paperboard, referencing the Photoshop grid that appears when a canvas is empty.',

    'Falling Out':
      '<p>Falling Out is a zigzag zine installation that illustrates the power of tangible objects that serve as bittersweet reminders of my transient past. The act of extracting a tooth zine from the gum installation is meant to replicate the pain of guilt and the process of grief that I experience when trying to discard the mementos that I have grown attached to. As the viewers take home this zine, I hope that this too will become a souvenir that will never be thrown out.<p>The installation is roughly 20” x 26.” The gum is meticulously hand-constructed with acrylic on cardboard, while the self-designed zine is printed on paper— readily available to be mass-produced. The use of two contrasting methods of production illustrates that, regardless of how each harmonious ’mountain of junk’ was made, every piece carries its own personal story.',

    'T-Minus':
      '<p>A countdown calendar illustrating the gradual transition of surrendering to capitalism as corporate machines. <p>In Korean Calendars, days of rest such as public holidays and Sundays are marked with the color red. As the calendar progresses, the compositions of the squares representing the days of the month begin to fade away. The first to start disappearing are the red squares, symbolizing the disruption of rest and the drainage of our color and individuality that are caused by the grind mindset. Though the distinct doomsday is unclear, the rabbits, a common subject of animal testing again remind us of what we will become.  <p>The process of T-Minus was extensive. I underwent steps of abstraction to translate my observations into graphic forms: from photographing, drawing on paper, and creating vector graphics, to deciding on the final form.',

    'Dream Archive':
      '<p>Triggered by my lack of hopeful aspirations and constant sweaty wakening from my bizarre nightmares, Dream Archive started as a project to recover my relationship with dreams by reaching out to the world for answers. Through social media and a collection of tear-off posters posted around the school, Dream Archive asked strangers: “What is it that you dream of?” <p>The responses were received through anonymous texts and were then shared on Instagram. Though the posters were soon taken down leading to a fast end to the project, I was able to gain insight into the dreams of my community strangers and replicate a nurturing digital environment that I experienced when sharing vulnerable stories with strangers through an anonymous therapy platform named Blahtherapy.<p>You can find more responses on <a href="https://www.instagram.com/partyinourdreams/" target="_blank">@partyinourdreams</a>.</p>',

    'The Subversive Power of Craftivism':
      '<p>The Subversive Power of Craftivism is a five-panel sequence that illustrates the history of craftivism through the progression of colour, image, and type, using excerpts from works such as Julia Bryan-Wilson’s The Politics of Craft and Gaby Franger’s Feminist Arts and Craftivism.<p>Like the subversive power of crafitivism itself, this sequence reclaims the colour hot pink and bold, hand stamped typgoraphy, grounded in extensive historical research on associations, gendered colour usage, and protest typography.<p>The process involved extensive research and material exploration, including quilting, photography, and cutting, alongside iterative layout development to translate the complex topic into a clear sequential visual narrative.',

    'Decoding in Practice':
      '<p>An interactive artist book that analyzes and reflects on my design process of decoding. Set in both English and Korean. <p>This book invites readers to experience my decoding process first-hand by decoding its contents. Colour, type, and layout are structured according to underlying systems, revealing patterns and relationships across pages. As the readers decode the material, the structure of the book gradually unfolds, making the system itself the primary narrative. ',

    'Dwell Motion Studies':
      '<p>A series of motion studies analyzing the visual rhetoric of Dwell’s Generations issue, translating its atmospheric, pathos-driven rhetoric and 3D architectural spatiality into time-based media.<p>By decoding the magazine through the typology of type, colour, image, and content structure, these visual elements were reorganized into a system of motion behaviours involving pacing, sequencing, entry and exit, screen space, and transformation.',

    'SAIC Blend':
      '<p>The winning design of the School of the Art Institute of Chicago’s 2024 merch design contest. <p>Inspired by my go-to order for the strawberry & banana smoothie at SAIC’s cafeterias, the SAIC Blend encapsulates the whirlwind of diverse disciplines, students, and cultures that can be tasted at SAIC. As the fields of study and symbols of SAIC such as the bean, pencil sharpenings, and pixels are placed onto a board game-like layout, the SAIC Blend emphasizes the customizable educational pathway and the interdisciplinary freedom that the school boasts.',

    'MHz: Desire Path':
      '<p>Co-founded with Koki Kin, Megahertz is an independent magazine created by and for youth across Canada and the United States. I developed the publication’s brand identity and editorial vision while overseeing art direction, cover and spread design, social media and engagement, collaborator coordination, and physical production.<p>Issue 1 of MHz, Desire Path, explores the experience of navigating beyond charted territories through featured works centered on resistance, adaptation, and personal transformation. My contribution to the issue, Reframing Progress for Accessible Futures, features an interview with Gabe Coronado Flores discussing accessibility, technology, and his experiences living with cerebral palsy.<p>You can view the full project here: <a href="https://megahertz.carrd.co/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGn0UQe6vuDLM0kEu00NdlZkmxaaBVB64yVXzoc9hZzXO-iq9sYDHnsd_m1Mds_aem_Eyf9wFSx8ymDhwD9NTqZHg" target="_blank">Megahertz</a>.',

    'AIGA Posters':
      '<p>Posters created for SAIC AIGA’s events.',




};


/*╔══════════════════════════════════════════════════════════╗
  ║  IMAGE LAYOUTS.                                          ║
  ╚══════════════════════════════════════════════════════════╝*/
const imageLayouts = {

  'Placeholder Example': [
    { type: 'placeholder', label: 'Cover spread', caption: 'Cover — 5.5  8.5″ ring-bound' },
    { type: 'sidebyside',
      left:  { type: 'placeholder', label: 'p.01' },
      right: { type: 'placeholder', label: 'p.02' },
      caption: 'Chapters 1–2: monospaced English typeface system' },
    { type: 'placeholder', label: 'Full spread', size: 'full-bleed' },
    { type: 'overlap',
      back:  { type: 'placeholder', label: 'layout A' },
      front: { type: 'placeholder', label: 'layout B' },
      caption: 'Colour palette derived from personal note-taking' },

    { type: 'slideshow',
      slides: [
        { type: 'placeholder', label: 'slide 1' },
        { type: 'placeholder', label: 'slide 2' },
        { type: 'placeholder', label: 'slide 3' },
      ],
      caption: 'Colour palette derived from personal note-taking' },
    { type: 'placeholder', label: 'Detail — folios', caption: 'Navigation reinforced through large folios' },
  ],





  /* CODE ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/
    'Bad Apple': [
    { type: 'video', src: 'content/code/apple 1.mp4' },
    { type: 'image', src: 'content/code/apple 5.webp'},
    { type: 'image', src: 'content/code/apple 6.webp'},
    { type: 'video', src: 'content/code/apple 4.mp4' },
    { type: 'video', src: 'content/code/apple 3.mp4' },
    { type: 'video', src: 'content/code/apple 2.mp4' }],

    'Syntax of a Firework': [
    { type: 'video', src: 'content/code/fireworks.mov' }],
    
    'Unicorns': [
    { type: 'video', src: 'content/code/unicorn.mov' }],

  /* PHOTOGRAPHY ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/
  
    'Mirage of Nostalgia': [
      { type: 'image', src: 'content/photography/mirage of nostalgia/MON1.webp' },
      { type: 'image', src: 'content/photography/mirage of nostalgia/MON2.webp' },
      { type: 'image', src: 'content/photography/mirage of nostalgia/MON3.webp' },
      { type: 'image', src: 'content/photography/mirage of nostalgia/MON4.webp' },
      { type: 'image', src: 'content/photography/mirage of nostalgia/MON5.webp' },
      { type: 'slideshow', slides: [
          { type: 'image', src: 'content/photography/mirage of nostalgia/MON9.webp' },
          { type: 'image', src: 'content/photography/mirage of nostalgia/MON7.webp' },
          { type: 'image', src: 'content/photography/mirage of nostalgia/MON8.webp' },
          { type: 'image', src: 'content/photography/mirage of nostalgia/MON6.webp' },],},
      { type: 'image', src: 'content/photography/mirage of nostalgia/MON10.webp' },
      { type: 'image', src: 'content/photography/mirage of nostalgia/MON12.webp' },
      { type: 'image', src: 'content/photography/mirage of nostalgia/MON11.webp' },],
      
    'Nocturnal Ritual': [
      { type: 'slideshow', slides: [
          { type: 'image', src: 'content/photography/nocturnal ritual/NR1.webp' },
          { type: 'image', src: 'content/photography/nocturnal ritual/NR2.webp' },
          { type: 'image', src: 'content/photography/nocturnal ritual/NR3.webp' }],},
      { type: 'image', src: 'content/photography/nocturnal ritual/NR4.webp' }],
  
  /* GRAPHIC DESIGN ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/
    'Milk Room': [
      { type: 'video', src: 'content/graphic design/milk room/ML1.mp4' }],

    'Falling Out': [
      { type: 'image', src: 'content/graphic design/falling out/FO1.webp'},
      { type: 'image', src: 'content/graphic design/falling out/FO2.webp'},
      { type: 'image', src: 'content/graphic design/falling out/FO3.webp'},
      { type: 'sidebyside',
        left:  { type: 'video', src: 'content/graphic design/falling out/FO5.mp4'},
        right: { type: 'image', src: 'content/graphic design/falling out/FO4.webp'},},
      { type: 'image', src: 'content/graphic design/falling out/FO6.webp'},
      { type: 'image', src: 'content/graphic design/falling out/FO7.webp'},],

    'Invisible Cities': [
      { type: 'video', src: 'content/graphic design/invisible cities/IC3.mp4'},
      { type: 'image', src: 'content/graphic design/invisible cities/IC2.webp'},
      { type: 'image', src: 'content/graphic design/invisible cities/IC1.webp'},],

    'Taste the Story': [
      { type: 'image', src: 'content/graphic design/taste the story/TTS1.webp'},
      { type: 'image', src: 'content/graphic design/taste the story/TTS.webp'},
      { type: 'image', src: 'content/graphic design/taste the story/TTS5.webp'},
      { type: 'image', src: 'content/graphic design/taste the story/TTS4.webp'},],

    'T-Minus': [
      { type: 'image', src: 'content/graphic design/t minus/TM1.webp'},
      { type: 'image', src: 'content/graphic design/t minus/TM3.webp'},
      { type: 'image', src: 'content/graphic design/t minus/TM4.webp'},
      { type: 'image', src: 'content/graphic design/t minus/TM5.webp'},],

    'Dream Archive': [
      { type: 'image', src: 'content/graphic design/dream archive/DA1.webp'},
      { type: 'image', src: 'content/graphic design/dream archive/DA2.webp', size: 'small center'},
      { type: 'image', src: 'content/graphic design/dream archive/DA3.webp'},
      { type: 'image', src: 'content/graphic design/dream archive/DA4.webp'},
      { type: 'image', src: 'content/graphic design/dream archive/DA5.webp'},
      { type: 'image', src: 'content/graphic design/dream archive/DA6.webp'},],

    'Field of Dreams Collection': [
      { type: 'image', src: 'content/graphic design/field of dreams/FOD2.webp'},
      { type: 'image', src: 'content/graphic design/field of dreams/FOD3.webp', size: 'small right'},
      { type: 'image', src: 'content/graphic design/field of dreams/FOD4.webp', size: 'small'},
      { type: 'image', src: 'content/graphic design/field of dreams/FOD6.webp'},
      { type: 'video', src: 'content/graphic design/field of dreams/FOD1.mp4'},],

    'On Dreams': [
      { type: 'video', src: 'content/graphic design/on dreams/OD1.mp4'},
      { type: 'image', src: 'content/graphic design/on dreams/OD4.webp'},
      { type: 'video', src: 'content/graphic design/on dreams/OD2.mp4',size: 'small'},
      { type: 'image', src: 'content/graphic design/on dreams/OD5.webp', size: 'small right'},
      { type: 'image', src: 'content/graphic design/on dreams/OD7.webp', size: 'small center'},
      { type: 'image', src: 'content/graphic design/on dreams/OD3.webp'},],

    'Decoding in Practice': [
      { type: 'image', src: 'content/graphic design/decoding in practice/DIP1.webp'},
      { type: 'video', src: 'content/graphic design/decoding in practice/DIP2.mp4'},
      { type: 'image', src: 'content/graphic design/decoding in practice/DIP5.webp'},
      { type: 'image', src: 'content/graphic design/decoding in practice/DIP9.webp', size: 'small'},
      { type: 'image', src: 'content/graphic design/decoding in practice/DIP10.webp', size: 'small right'},
      { type: 'image', src: 'content/graphic design/decoding in practice/DIP6.webp'},
      { type: 'image', src: 'content/graphic design/decoding in practice/DIP11.webp'},],



    'Design How-Tos': [
      { type: 'video', src: 'content/graphic design/overdrive/AA1.mp4'},
      { type: 'slideshow', size: 'small',
          slides: [
            { type: 'video', src: 'content/graphic design/overdrive/DD1.mp4'},
            { type: 'video', src: 'content/graphic design/overdrive/DD2.mp4'},
            { type: 'video', src: 'content/graphic design/overdrive/DD3.mp4'},
            { type: 'video', src: 'content/graphic design/overdrive/DD4.mp4'},
            { type: 'video', src: 'content/graphic design/overdrive/DD5.mp4'},
            { type: 'video', src: 'content/graphic design/overdrive/DD6.mp4'},
            { type: 'video', src: 'content/graphic design/overdrive/DD7.mp4'},],}],      

    'Dwell Motion Studies': [
      { type: 'video', src: 'content/graphic design/dwell/8_1.mp4'},
      { type: 'video', src: 'content/graphic design/dwell/5_1.mp4'},
      { type: 'video', src: 'content/graphic design/dwell/10_1.mp4'},
      { type: 'video', src: 'content/graphic design/dwell/6_1.mp4'},
      { type: 'video', src: 'content/graphic design/dwell/9_1.mp4'},
      { type: 'video', src: 'content/graphic design/dwell/3_1.mp4'},],    
    

  'The Subversive Power of Craftivism': [
      { type: 'image', src: 'content/graphic design/the subversive power of craftivism/C1.webp'},
      { type: 'slideshow', size: 'small',
          slides: [
            { type: 'image', src: 'content/graphic design/the subversive power of craftivism/C2.webp'},
            { type: 'image', src: 'content/graphic design/the subversive power of craftivism/C3.webp'},
            { type: 'image', src: 'content/graphic design/the subversive power of craftivism/C4.webp'},
            { type: 'image', src: 'content/graphic design/the subversive power of craftivism/C5.webp'},
            { type: 'image', src: 'content/graphic design/the subversive power of craftivism/C6.webp'},]}],    
    

  'F Newsmagazine': [
      { type: 'image', src: 'content/graphic design/fnews/FN1.webp'},

      { type: 'sidebyside',
            left:  { type: 'image', src: 'content/graphic design/fnews/mar1.webp'},
            right: { type: 'image', src: 'content/graphic design/fnews/mar2.webp'},},
      { type: 'image', src: 'content/graphic design/fnews/web illo copy 2.webp'},
      { type: 'sidebyside',
            left:  { type: 'image', src: 'content/graphic design/fnews/nov1.webp'},
            right: { type: 'image', src: 'content/graphic design/fnews/nov2.webp'},}, 
      { type: 'sidebyside',
            left:  { type: 'image', src: 'content/graphic design/fnews/may1.webp'},
            right: { type: 'image', src: 'content/graphic design/fnews/may4.webp'},},   
      { type: 'image', src: 'content/graphic design/fnews/apr1.webp'},
      { type: 'sidebyside',
            left:  { type: 'image', src: 'content/graphic design/fnews/dec1.webp'},
            right: { type: 'image', src: 'content/graphic design/fnews/dec2.webp'},},    

      { type: 'image', src: 'content/graphic design/fnews/apr2.webp'},],
    
  'SAIC Blend': [
      { type: 'image', src: 'content/graphic design/SAIC BLEND/SB1.webp'},
      { type: 'sidebyside',
            left:  { type: 'image', src: 'content/graphic design/SAIC BLEND/SB4.webp'},
            right: { type: 'image', src: 'content/graphic design/SAIC BLEND/SB3.webp'},},          
      { type: 'image', src: 'content/graphic design/SAIC BLEND/SB5.webp'},],
    
  'MHz: Desire Path': [
      { type: 'image', src: 'content/graphic design/desire path/2.webp'},
      { type: 'image', src: 'content/graphic design/desire path/3.webp', size: 'small right'},
      { type: 'image', src: 'content/graphic design/desire path/8.webp', size: 'small'},
      { type: 'image', src: 'content/graphic design/desire path/7.webp'},
      { type: 'video', src: 'content/graphic design/desire path/DP1.mp4', size: 'small right'},],

  'AIGA Posters': [
      { type: 'image', src: 'content/graphic design/aiga/AIGA1.webp'},
      { type: 'image', src: 'content/graphic design/aiga/AIGA2.webp'},
      { type: 'image', src: 'content/graphic design/aiga/AIGA3.webp'},
      { type: 'image', src: 'content/graphic design/aiga/AIGA4.webp'},

],



      
      
    









  /* add more projects here following the same pattern */
};
