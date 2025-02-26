# Cannafield API

This repository contains the code for the Cannafield API, which is built using Node.js and Express. The API manages data related to Cannafield entities stored in a MongoDB database. Here you will find instructions on how to set up and use the API.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or newer)
- [MongoDB](https://www.mongodb.com/try/download/community) (either locally installed or using a remote instance)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Rabbit1026HG/React-Zoom-Sample.git
cd React-Zoom-Sample
```

### Install Dependencies

Use npm to install the required packages:

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the root directory of your project and add your configuration variables. You will need at least the following:

```plaintext
PORT=4000
MONGO_URI=your-mongodb-connection-string
```

Replace `your-mongodb-connection-string` with your actual MongoDB connection string.

### Run the Server

Start the server using the following command:

```bash
npm start
```

The server will run by default on [http://localhost:4000](http://localhost:4000).

## API Endpoints

| Method | Endpoint              | Description                                 |
| ------ | --------------------- | ------------------------------------------- |
| GET    | `/api/cannafield/`    | Retrieve all cannafield entries.            |
| POST   | `/api/cannafield/`    | Fetch specific pieces based on input range. |
| POST   | `/api/cannafield/purchase` | Update selected status of pieces.         |

### Example API Request

#### Get All Cannafield Data

```http
GET /api/cannafield/
```

Response:

```json
{
  "msg": "success",
  "data": [
    {
      "num": 1,
      "selectedNum": 0,
      "pieces": [...]
    },
    ...
  ]
}
```

#### Post Specific Range

```http
POST /api/cannafield/
```

Body:

```json
{
  "x1": 0,
  "y1": 0,
  "x2": 10,
  "y2": 10
}
```

#### Update Selected Pieces

```http
POST /api/cannafield/purchase
```

Body:

```json
[
  {
    "blockId": 1,
    "pieceId": "abc123"
  },
  ...
]
```

## Error Handling

Errors are managed centrally with middleware functions:

- **notFound**: Captures non-existent routes and responds with a 404 status.
- **errorHandler**: Handles server-side errors and returns a 500 status.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to contribute to this project by submitting issues or pull requests to improve functionality and documentation. For any questions, consult the [issues page](https://github.com/your-username/cannafield-api/issues).