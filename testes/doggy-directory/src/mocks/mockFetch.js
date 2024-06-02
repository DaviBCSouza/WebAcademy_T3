const breedsListResponse = {
  message: {
    boxer: [],
    cattledog: [],
    dalmatian: [],
    husky: [],
  },
};

const dogImagesResponse = {
  message: [
    "https://images.dog.ceo/breeds/cattledog-australian/IMG_1042.jpg ",
    "https://images.dog.ceo/breeds/cattledog-australian/IMG_5177.jpg",
  ],
};

const randomDogInfoResponse = {
  data: {
    0: {
      attributes: {
        body: "The Norwegian Lundehund is known for its six toes and ability to tip its head backward until it touches the spine.",
      },
    },
  },
};

export default async function mockFetch(url) {
  switch (url) {
    case "https://dog.ceo/api/breeds/list/all": {
      return {
        ok: true,
        status: 200,
        json: async () => breedsListResponse,
      };
    }
    case "https://dog.ceo/api/breed/husky/images":
    case "https://dog.ceo/api/breed/cattledog/images": {
      return {
        ok: true,
        status: 200,
        json: async () => dogImagesResponse,
      };
    }
    case "https://dogapi.dog/api/v2/facts": {
      return {
        ok: true,
        status: 200,
        json: async () => randomDogInfoResponse,
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}
