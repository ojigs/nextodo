# Nextodo

A feature-rich Todo application built with Next.js 14, React, and Tailwind CSS.

<div style="display: flex; gap: 10px; align-items: center;">
  <img src="/public/desktop-view-image.png" alt="Desktop View" style="width: 75%; border-radius: 8px;" />
  <img src="/public/mobile-view.png" alt="Mobile View" style="width: 25%; border-radius: 8px;" />
</div>

## Key Features

1. **Server-side Rendering**: The application leverages Next.js 14's server components to improve initial page load performance.
2. **Modular Components**: The codebase is organized into smaller, focused components for better maintainability and testability.
3. **State Management**: The application state is managed using React's useState hook, for efficient state updates.
4. **Form Handling**: The react-hook-form library is used for form management.
5. **Visual Feedback**: The user interface provides visual cues for task priorities, completed tasks, and overdue tasks.

## Components

The application is divided into the following key components:

1. **TodoContainer**: The main container component that manages the application state and organizes the child components.
2. **AddTaskForm**: Handles the creation of new tasks.
3. **TaskList**: Renders the list of tasks, both pending and completed, and manages the editing state.
4. **TaskItem**: Responsible for displaying a single task, including the ability to edit or delete it.
5. **TaskDisplay**: Presents the task details, including priority, due date, and description.

## State Management

The application state is managed using React's `useState` hook, with the following key pieces of state:

- `tasks`: An array of task objects that shows the user's tasks.
- `editingId`: The ID of the task currently being edited.

The state is updated through various functions, such as `addTask`, `toggleTask`, `deleteTask`, `startEditing`, and `saveEdit`.

## Form Handling

The application uses the `react-hook-form` library for form management, making it easy to validate and submit the form. It manages the form state separately from the main application state.

## Styling and Responsiveness

The application is styled using Tailwind CSS. The layout and components are designed to be responsive for different screen sizes.

## Want to contribute?

- **Server-side Data Fetching**: Integrate Next.js 14's built-in data fetching capabilities to fetch tasks from a server-side API.
- **Persistence**: Implement a storage solution (e.g., localStorage, IndexedDB) to persist the user's tasks across sessions.
- **Drag and Drop**: Add the ability to reorder tasks using a drag-and-drop interface.
- **Subtasks and Checklists**: Expand the task model to support subtasks and checklists within each task.
- **Notifications**: Implement a notification system to alert users of due dates, overdue tasks, or other important events.
