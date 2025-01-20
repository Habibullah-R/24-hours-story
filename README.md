# Story system like Social media platforms

This project is a **React-based Stories Component** inspired by features found in social media platforms like Instagram and WhatsApp. The component allows users to upload and view stories with modal functionality, progress bars, and image transitions using SwiperJS.

---

## Features

1. **Upload Stories**:

   - Users can upload images for stories.
   - Images are stored in `localStorage` for persistence.
   - Stories expire after 24 hours and are automatically removed.

2. **Display Stories**:

   - Stories are displayed in a horizontal scrolling list.
   - Viewed stories are visually marked with a gray border, while unviewed stories have a green border.

3. **Story Modal**:

   - Clicking a story opens it in a modal with a SwiperJS slider for navigation.
   - Stories automatically transition with a progress bar indicating time.
   - Navigation controls for switching between stories.

4. **Progress Bar**:

   - Each story displays a progress bar for the viewing duration.
   - Automatically closes the modal when the last story ends.

5. **Responsiveness**:
   - The interface is responsive, working seamlessly across devices.

---

## Technologies Used

- **React**: Functional components and hooks (`useState`, `useEffect`, `useCallback`, `useRef`).
- **SwiperJS**: For carousel/slider functionality in the modal.
- **CSS & TailwindCSS**: For styling the component.
- **LocalStorage**: For storing and retrieving story data.
- **Remixicon**: For using icons in the UI.

---

## Project Structure

```
src/
├── components/
│   ├── Stories.jsx     // Main component for displaying and managing stories
│   ├── Modal.jsx       // Modal for viewing individual stories with SwiperJS
├── index.css           // Tailwind and custom styles
└── App.js              // Entry point for the application
```

---

## How to Run the Project

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Habibullah-R/24-hours-story.git
   cd 24-hours-story
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm run dev
   ```

4. **Open the Application**:
   - Visit `http://localhost:3000` (or the URL provided by your dev server).

---

## How to Use

1. **Add a Story**:

   - Click on the "Add Story" button.
   - Select an image file to upload.

2. **View Stories**:

   - Click on any story to open it in the modal.
   - Navigate through stories using the progress bar or Swiper navigation controls.

3. **Automatic Expiry**:
   - Stories older than 24 hours are automatically removed.

---

## Customization

- **Progress Bar Duration**:

  - Modify the interval duration in `Modal.jsx` to change story timing:
    ```javascript
    setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 30); // Adjust the duration here
    ```

- **Styling**:
  - Customize the styles in the CSS or Tailwind configuration for branding.

---

## Future Enhancements

1. Integrate with a backend for user-specific stories.
2. Add support for video stories.
3. Implement authentication to handle personalized stories.
4. Add swipe gestures for touch devices.
5. Improve UI/UX with animations.

---

## Dependencies

- [React](https://reactjs.org/)
- [SwiperJS](https://swiperjs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Remixicon](https://remixicon.com/)

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---


## Description

- [Description](https://roadmap.sh/projects/stories-feature)

---

### Author

Developed by Habibullah.  
