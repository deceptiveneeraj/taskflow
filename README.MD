# 📝 TaskFlow

A lightweight, intuitive task management application with full CRUD operations. TaskFlow helps you organize your daily tasks efficiently with a clean and modern interface.

![TaskFlow](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/javascript-vanilla-yellow.svg)

## 🌟 Features

- ✅ **Create Tasks** - Add new tasks with title and content
- 📖 **Read Tasks** - View all your tasks in an organized list
- ✏️ **Update Tasks** - Edit existing tasks seamlessly
- 🗑️ **Delete Tasks** - Remove tasks with confirmation prompt
- ✔️ **Task Completion** - Mark tasks as complete with checkboxes
- 💾 **Local Storage** - All data persists in browser storage
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Clean and intuitive user interface

## 🚀 Demo

[Live Demo](https://deceptiveneeraj.github.io/taskflow/)

## 📸 Screenshots

![Quick List](./assets/img/logo.png)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with Flexbox
- **JavaScript (Vanilla)** - Core functionality and CRUD operations
- **Font Awesome** - Icon library
- **LocalStorage API** - Data persistence

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/deceptiveneeraj/taskflow.git
```

2. Navigate to the project directory:
```bash
cd taskflow
```

3. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply drag and drop the `index.html` file into your browser.

## 💻 Usage

1. **Adding a Task**
   - Enter task title in the first input field
   - Enter task content/description in the second field
   - Click "Add Task" button

2. **Editing a Task**
   - Click the "Edit" button on any task
   - Modify the title and content
   - Click "Update Task" to save changes

3. **Completing a Task**
   - Check the checkbox next to the task
   - Task will be marked with strikethrough text

4. **Deleting a Task**
   - Click the "Delete" button on any task
   - Confirm deletion in the popup

## 📁 Project Structure

```
taskflow/
│
├── index.html          # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css   # Stylesheet
│   ├── js/
│   │   └── main.js     # JavaScript functionality
│   └── img/
│       └── favicon.png # Favicon
├── manifest.json       # PWA manifest
└── README.md          # Project documentation
```

## 🔧 How It Works

TaskFlow uses JavaScript's localStorage API to store tasks persistently in your browser. Each task is assigned a unique ID based on timestamp, allowing for efficient CRUD operations:

- **CREATE**: New tasks are added to the tasks array
- **READ**: Tasks are retrieved from localStorage and displayed
- **UPDATE**: Existing tasks are modified by their unique ID
- **DELETE**: Tasks are removed from the array by filtering

## 🌐 Browser Support

TaskFlow works on all modern browsers that support:
- ES6+ JavaScript
- LocalStorage API
- CSS Flexbox

Tested on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## 📝 Future Enhancements

- [ ] Add task categories/tags
- [ ] Implement search and filter functionality
- [ ] Add due dates and reminders
- [ ] Dark mode toggle
- [ ] Export tasks to JSON/CSV
- [ ] Drag and drop task reordering
- [ ] Task priority levels
- [ ] Multiple task lists/projects

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Neeraj**

- GitHub: [Neeraj Solanki](https://github.com/deceptiveneeraj)
- Website: [TaskFlow](https://deceptiveneeraj.github.io/taskflow/)

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐️!

## 📞 Contact

For questions or feedback, feel free to reach out or open an issue on GitHub.

---

<p align="center">Made with ❤️ by Neeraj</p>