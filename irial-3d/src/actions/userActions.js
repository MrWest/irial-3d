import { FETCH_TOURS, SELECT_TOUR } from "./types";
import DashBoard from "../apis/DashBoard";
import {generatePHPParameters} from "../apis/tools";
import axios from "axios";

const tours = [
    {
        id: 1,
        name: "Viñales Day Tour",
        general_description: "This property helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it here",
        full_description: "En nuestro recorrido conocerá el Parque Nacional Viñales declarado patrimonio de la humanidad por"+ 
        "la UNESCO, una de las áreas más atractivas de Cuba, caracterizada por la fusión de su espectacular "+
        "belleza natural, conservación del medio ambiente y cultura local campesina, conformando un valor"+
        "estético y socio-cultural excepcional, que de conjunto fundamenta el criterio de Paisaje "+
        "Cultural; Sera una experiencia sin igual y autóctona, donde el visitante comprobara la calidez de "+
        " nuestra gente con sus tradiciones y disfrutara de una belleza natural majestuosa.",
        modality: "Excursiones desde Cruceros.",
        category: "cruise",
        images: [
            {
                url: "images/sections/tours/categories/promotionals/front.jpg",
                caption: "",
                alt:""
            },
            {
                url: "images/sections/tours/categories/promotionals/mural-de-la-prehistoria.jpg",
                caption: "",
                alt:""
            },
            {
                url: "images/sections/tours/categories/promotionals/front2.jpg",
                caption: "",
                alt:""
            }
        ],
        videos: [
            {url: "/images/sections/tours/categories/cruise/DJI_0032.mp4", caption: "Ecoturismo"},
            {url: "/images/sections/tours/categories/nature/MVI_1977.mpg", caption: "Ecoturismo"}
        ],
        program: [
            { content: "Recogida en el hotel o lugar de hospedaje 8:00 AM o 9:00 AM en dependencia de la distancia a recorrer." },
            { content: "Traslado por carretera hacia los sitios de interes en el Parque Nacional Viñales."},
            { content: "Visita al mirador ¨Los Jazmines¨ (Maravillosa vista hacia el Valle de Viñales)."},
            { content: "Visita al Mural de la Prehistoria.(Debe pagar un abonado de 5 CUC no incluido). "},
            { content: "Recorrido por el pueblo de Viñales (Almuerzo en Restaurant Privado debe pagar un abonado de 10 CUC no incluido)."},
            { content: "Visita a Finca campesina para conocer la cultura local y sus tradiciones (Proceso del tabaco)."},
            { content: "Visita al Palenque de los Cimarrones.  "},
            { content: "Visita a la Cueva del Indio (Debe pagar un abonado de 5 CUC no incluido).   "},
            { content: "Regreso al hotel o lugar de hospedaje."}
        ],
        howLong: "6 o 10 hours",
        pickupTime: "8:00 AM o 9:00 AM",
        guide: "Yes",
        languages: "English Spanish",
            comments: [
              {
                id: 1,
                author: "Helen",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo massa,.",
                date: "02/20/19"
              },
              {
                id: 2,
                author: "Julio",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo massa, venenatis vitae ante nec, vestibulum facilisis mi. Sed non viverra sapien. Integer ornare velit purus, vitae malesuada odio at.",
                date: "02/20/19"
              },
              {
                id: 3,
                author: "Helen",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo massa,.",
                date: "02/20/19"
              },
              {
                id: 4,
                author: "Julio",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo massa, venenatis vitae ante nec, vestibulum facilisis mi. Sed non viverra sapien. Integer ornare velit purus, vitae malesuada odio at.",
                date: "02/20/19"
              }
            ]
    },
    {
        id: 2,
        name: "Guanahacabibes",
        general_description : "This property helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it here",
        full_description: "Conozca la península de Guanahacabibes el punto más occidental en la isla de Cuba, declarada como"+
        "Reserva de la Biosfera por la UNESCO desde el año 1987, disfruta de la gran belleza natural de este "+
        "parque nacional y descubre toda la flora y fauna que reúne, sus 172 especies de aves, 700 de plantas,"+
        "18 de mamíferos, 35 de reptiles y 19 de anfibios, lo describen como un auténtico paraíso para "+
        "   submarinistas, ecoturistas, observadores de aves y conservacionistas.",
        modality: "Excursiones Terrestres y Náuticas.",
        category: "nature",
        images: [
            {
                url: "images/sections/tours/categories/promotionals/maria-la-gorda.jpg",
                caption: "",
                alt:""
            },
            {
                url: "images/sections/tours/categories/promotionals/mural-de-la-prehistoria.jpg",
                caption: "",
                alt:""
            },
            {
                url: "images/sections/tours/categories/promotionals/front2.jpg",
                caption: "",
                alt:""
            }
        ],
        videos: [
            {url: "/images/sections/tours/categories/nature/MVI_1971.mpg", caption: "Ecoturismo"},
            {url: "/images/sections/tours/categories/nature/MVI_1977.mpg", caption: "Ecoturismo"}
        ],
        program: [
            { content: "Recogida en el hotel o lugar de hospedaje 8:00 AM o 9:00 AM en dependencia de la distancia a recorrer." },
            { content: "Traslado por carretera hacia los sitios de interes en el Parque Nacional Viñales."},
            { content: "Visita al mirador ¨Los Jazmines¨ (Maravillosa vista hacia el Valle de Viñales)."},
            { content: "Visita al Mural de la Prehistoria.(Debe pagar un abonado de 5 CUC no incluido). "},
            { content: "Recorrido por el pueblo de Viñales (Almuerzo en Restaurant Privado debe pagar un abonado de 10 CUC no incluido)."},
            { content: "Visita a Finca campesina para conocer la cultura local y sus tradiciones (Proceso del tabaco)."},
            { content: "Visita al Palenque de los Cimarrones.  "},
            { content: "Visita a la Cueva del Indio (Debe pagar un abonado de 5 CUC no incluido).   "},
            { content: "Regreso al hotel o lugar de hospedaje."}
        ],
        howLong: "6 o 10 hours",
        pickupTime: "8:00 AM o 9:00 AM",
        guide: "Yes",
        languages: "English Spanish",
            comments: [
              {
                id: 1,
                author: "Helen",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo massa,.",
                date: "02/20/19"
              },
              {
                id: 2,
                author: "Julio",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo massa, venenatis vitae ante nec, vestibulum facilisis mi. Sed non viverra sapien. Integer ornare velit purus, vitae malesuada odio at.",
                date: "02/20/19"
              },
              {
                id: 3,
                author: "Helen",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo massa,.",
                date: "02/20/19"
              },
              {
                id: 4,
                author: "Julio",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo massa, venenatis vitae ante nec, vestibulum facilisis mi. Sed non viverra sapien. Integer ornare velit purus, vitae malesuada odio at.",
                date: "02/20/19"
              }
            ]
    },
    {
        id: 3,
        name: "Cayo Jutias",
        general_description : "This property helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it here",
        full_description: "Conozca la increible experiencia en una de las playas más bonitas de Cuba Cayo Jutias, ubicado"+
        "en la costa norte de Pinar del Río con una extensión de 4 kilómetros cuadrados de arenas finas"+
        "conectado a Cuba gracias a un pedraplén (una vía sobre el mar), es descrita como una de las "+
        "playas más bonitas de Cuba, y su ubicación es ideal. Pasar unas vacaciones en Cayo Jutias es"+
        "de las mejores experiencias que podrás tener como turista, descubre un poco sobre este paraíso "+
        "escondido cerca de Viñales. ",
        modality: "Excursiones Náuticas",
        category: "beach",
        images: [
            {
                url: "images/sections/tours/categories/promotionals/cayo-jutias.jpg",
                caption: "",
                alt:""
            },
            {
                url: "images/sections/tours/categories/promotionals/mural-de-la-prehistoria.jpg",
                caption: "",
                alt:""
            },
            {
                url: "images/sections/tours/categories/promotionals/front2.jpg",
                caption: "",
                alt:""
            }
        ],
        videos: [
            {url: "/images/sections/tours/categories/nature/MVI_1971.mpg", caption: "Ecoturismo"},
            {url: "/images/sections/tours/categories/nature/MVI_1977.mpg", caption: "Natural"}
        ],
        program: [
            { content: "Recogida en el hotel o lugar de hospedaje 8:00 AM o 9:00 AM en dependencia de la distancia a recorrer." },
            { content: "Traslado por carretera hacia los sitios de interes en el Parque Nacional Viñales."},
            { content: "Visita al mirador ¨Los Jazmines¨ (Maravillosa vista hacia el Valle de Viñales)."},
            { content: "Visita al Mural de la Prehistoria.(Debe pagar un abonado de 5 CUC no incluido). "},
            { content: "Recorrido por el pueblo de Viñales (Almuerzo en Restaurant Privado debe pagar un abonado de 10 CUC no incluido)."},
            { content: "Visita a Finca campesina para conocer la cultura local y sus tradiciones (Proceso del tabaco)."},
            { content: "Visita al Palenque de los Cimarrones.  "},
            { content: "Visita a la Cueva del Indio (Debe pagar un abonado de 5 CUC no incluido).   "},
            { content: "Regreso al hotel o lugar de hospedaje."}
        ],
        howLong: "6 o 10 hours",
        pickupTime: "8:00 AM o 9:00 AM",
        guide: "Yes",
        languages: "English Spanish",
            comments: [
              {
                id: 1,
                author: "Helen",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo massa,.",
                date: "02/20/19"
              },
              {
                id: 2,
                author: "Julio",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo massa, venenatis vitae ante nec, vestibulum facilisis mi. Sed non viverra sapien. Integer ornare velit purus, vitae malesuada odio at.",
                date: "02/20/19"
              },
              {
                id: 3,
                author: "Helen",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo massa,.",
                date: "02/20/19"
              },
              {
                id: 4,
                author: "Julio",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo massa, venenatis vitae ante nec, vestibulum facilisis mi. Sed non viverra sapien. Integer ornare velit purus, vitae malesuada odio at.",
                date: "02/20/19"
              }
            ]
    }
]



export const fetchTours = () => async dispatch => {
  const toursDb = await DashBoard.post("/tours/get_tours.php")
  
  var toursRslt = toursDb.data.slice()
      
     const promises = toursRslt.map( async tour => {   
         
       const toursImagesDb = await DashBoard.get("/tours/get_tour_images.php"+ generatePHPParameters({idTour: tour.id}))
       tour.images = toursImagesDb.data
       tour.program = []
       tour.comments = []

       return tour
       
     })

     const results = await Promise.all(promises)

     dispatch({
      type: FETCH_TOURS,
      payload: results//fromDB
    });


  };

  
  export const sortTours = category => async dispatch => {

    var toursDb = undefined
    
    if(category === "all")
        toursDb = await DashBoard.post("/tours/get_tours.php")
     else
          toursDb = await DashBoard.post("/tours/get_tours.php"+ generatePHPParameters({category}))

     var toursRslt = toursDb.data.slice()
      
     const promises = toursRslt.map( async tour => {   
         
       const toursImagesDb = await DashBoard.get("/tours/get_tour_images.php"+ generatePHPParameters({idTour: tour.id}))
       tour.images = toursImagesDb.data
       tour.program = []
       tour.comments = []

       return tour
       
     })

     const results = await Promise.all(promises)

     dispatch({
      type: FETCH_TOURS,
      payload: results//fromDB
    });
    
  
    

   
  };

  export const selectTour = id => async dispatch => {
  

    const toursDb = await DashBoard.post("/tours/get_tour.php"+ generatePHPParameters({id: id}))
  
       var toursRslt = toursDb.data
      
           
       const toursImagesDb = await DashBoard.get("/tours/get_tour_images.php"+ generatePHPParameters({idTour: toursRslt.id}))
       toursRslt.images = toursImagesDb.data

       const toursprogramDb = await DashBoard.get("/tours/get_tour_program.php"+ generatePHPParameters({idTour: toursRslt.id}))
       toursRslt.program = toursprogramDb.data

       const tourscommentsDb = await DashBoard.get("/tours/get_tour_comments.php"+ generatePHPParameters({idTour: toursRslt.id}))
       toursRslt.comments = tourscommentsDb.data
      
       const toursvideosDb = await DashBoard.get("/tours/get_tour_videos.php"+ generatePHPParameters({idTour: toursRslt.id}))
       toursRslt.videos = toursvideosDb.data


    

     dispatch({
      type: SELECT_TOUR,
      payload: toursRslt//fromDB
    });
 

  //  var tour = {}
  //  tours.map(t => {
  //      if(parseInt(t.id) === parseInt(id))
  //       tour = t
  //  })

  
  //   dispatch({
  //     type: SELECT_TOUR,
  //     payload: tour
  //   });

   
  };