import {Client, Databases} from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Appwrite Cloud endpoint
  .setProject('6810f216001532c2bf1d') // Replace with your Project ID
  .setKey(
    'standard_bc897798c3aa6147b089851c2193fba7d4033c40546e9bad5acad0b1a4885c24b5d98e28f6d0bdaa1250719be6a5f2ff105420da3459d929562e4d03e7e3d7ab7b62f8a50bd6225184a20c541df2ca1bf964aeb3eada2a7b2294be44ae64c901e8f7238c73a6680f73fd92f2450cce555c30e0444e9f49e1047224f197b4ed4a',
  ); // Replace with your API key

const databases = new Databases(client);

export {databases};
