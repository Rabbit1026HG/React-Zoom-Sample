# CannaField Map Application

The CannaField Map is a React-based frontend application that provides an interactive map interface for visualizing blocks of data, potentially related to a cannabis field. It includes zooming, panning, and dynamic data fetching capabilities.

## Features

- **Interactive Map**: Users can zoom in/out and pan across the map.
- **Dynamic Data Loading**: Data adjusts dynamically based on the viewport, which updates with user interactions.
- **Responsive Design**: Adaptable to various screen sizes.
- **State Management**: Utilizes Jotai for efficient global state management.

## Prerequisites

- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed on your system.
- **Package Manager**: Preferably `npm` or `yarn`.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd repository-directory
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**:
   Create a `.env` file at the root level of your project directory. Define environment variables like API URL:

   ```
   VITE_API_URL=<your_backend_api_url>
   ```

4. **Start the Development Server**:
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Build for Production**:
   ```bash
   npm run build
   # or
   yarn build
   ```

## File Structure

- **App.jsx**: The main application component. Integrates `CannaFiledMap` and `Purcharge`.
  
- **components/CannaFiledMap.jsx**: Defines the `CannaFiledMap` component. Manages the rendering and interactivity of the map view.

- **components**:
  - **Block**: Renders each block within the map.
  - **Control**: UI controls for additional map functionalities.
  - **Loading**: Displays loading feedback when data is being fetched.

- **store**: Contains Jotai atoms for managing application-wide state.

## Usage

- Launch the app using `npm start` or `yarn start`, and open the provided local server URL in a web browser.
- Interact with the map by clicking and dragging to pan, or use the scroll wheel to zoom in and out.

## Customization

- Adjust the constants in `cannafiledmap.jsx` such as `bwidth`, `bheight` for different block sizes or grid dimension.
- Modify functions like `fetchData` if the API endpoint changes.
- Update CSS in `App.css` or other style files to adapt the look and feel.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests for any bugs or enhancements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for additional details.