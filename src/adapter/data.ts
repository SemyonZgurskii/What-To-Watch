import {Movie} from './../types';

function convertData(originalData): Movie {
  return {
    backgroundColor: originalData.background_color,
    backgroundImage: originalData.background_image,
    description: originalData.description,
    director: originalData.director,
    genre: originalData.genre,
    id: originalData.id,
    isFavorite: originalData.is_favorite,
    name: originalData.name,
    posterImage: originalData.poster_image,
    previewImage: originalData.preview_image,
    previewVideoLink: originalData.preview_video_link,
    rating: originalData.rating,
    releaseDate: originalData.released,
    runTime: originalData.run_time,
    scoreCount: originalData.scores_count,
    starring: originalData.starring,
    videoLink: originalData.video_link,
  }
}

export {convertData};
