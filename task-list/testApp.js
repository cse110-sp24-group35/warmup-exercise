/**
 * Tests for Task Management Widget
 */

// Mock data for testing
const tasks = [
    {
        name: "Complete project proposal",
        deadline: "2024-04-30",
        priority: "High",
        tags: ["work", "urgent"]
    },
    {
        name: "Update website content",
        deadline: "2024-05-15",
        priority: "Medium",
        tags: ["work", "maintenance"]
    }
];

// Function to simulate loading tasks
function loadTasks() {
    return tasks;
}

// Test function to check if tasks are loaded correctly
function testLoadTasks() {
    const loadedTasks = loadTasks();
    if (loadedTasks.length === tasks.length && loadedTasks.every((task, index) => task.name === tasks[index].name)) {
        console.log('Test Load Tasks: SUCCESS');
    } else {
        console.error('Test Load Tasks: FAIL');
    }
}

// Function to simulate sorting tasks by deadline
function sortTasks() {
    return tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
}

// Test function to check if sorting by deadline works correctly
function testSortTasks() {
    const sortedTasks = sortTasks();
    if (sortedTasks[0].name === "Complete project proposal") {
        console.log('Test Sort Tasks: SUCCESS');
    } else {
        console.error('Test Sort Tasks: FAIL');
    }
}

// Function to simulate filtering tasks by tag
function filterTasks(tag) {
    return tasks.filter(task => task.tags.includes(tag));
}

// Test function to check if filtering by tag works correctly
function testFilterTasks() {
    const filteredTasks = filterTasks("urgent");
    if (filteredTasks.length === 1 && filteredTasks[0].name === "Complete project proposal") {
        console.log('Test Filter Tasks: SUCCESS');
    } else {
        console.error('Test Filter Tasks: FAIL');
    }
}

// Running all tests
function runAllTests() {
    testLoadTasks();
    testSortTasks();
    testFilterTasks();
}

// Execute tests
runAllTests();
