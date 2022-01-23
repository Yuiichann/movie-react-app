const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '0bf7c5b93e01540d53d9e0a4a51db4cc',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig;
