
### 1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll

Answer:
These are different methods to select DOM elements. Each has its own use case:

**getElementById** → grabs a single element using its unique ID. Since IDs should be unique, it always returns one element (or null).

```javascript
const element = document.getElementById('total-count');
```

**getElementsByClassName** → selects all elements with a specific class name. Returns a live HTMLCollection, meaning it updates automatically when the DOM changes.

```javascript
const elements = document.getElementsByClassName('tab-button');
// returns all elements with class "tab-button"
```

**querySelector** → uses CSS selectors to find the first matching element. Very flexible since you can use any CSS selector.

```javascript
const firstButton = document.querySelector('.tab-button');
// returns the first element with class "tab-button"
```

**querySelectorAll** → also uses CSS selectors but returns all matching elements as a static NodeList.

```javascript
const allButtons = document.querySelectorAll('.tab-button');
// returns all elements with class "tab-button"
```

**differences:**
- getElementById is the fastest but only works with IDs
- getElementsByClassName returns a live collection
- querySelector/querySelectorAll are more flexible with CSS selectors
- querySelectorAll returns a static NodeList (doesn't auto-update)

---

### 2. How to create and insert a new element in the DOM

Answer:
To add a new element to the page, we use JavaScript to create it and then insert it into the desired location. There are several ways:

**1: createElement with appendChild**
```javascript
// create a new div
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
newDiv.className = 'my-class';

// select parent and add the new element
const parent = document.getElementById('container');
parent.appendChild(newDiv);
```

**2: innerHTML (used in my project)**
```javascript
const container = document.getElementById('jobs-container');
container.innerHTML = '<div class="card">New Job Card</div>';
```

**Method 3: insertAdjacentHTML**
```javascript
element.insertAdjacentHTML('beforeend', '<div>Content</div>');
```

**example from my project:**
```javascript
const jobCard = (job) => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg card-border w-full';
    
    card.innerHTML = `
        <div class="flex flex-col gap-5 p-6">
            <h3>${job.companyName}</h3>
            <p>${job.position}</p>
        </div>
    `;
    
    return card;
};

// then insert 
jobCardContainer.appendChild(jobCard(job));
```

**Why i used innerHTML?**
- Easy to write HTML structure
- Good for creating complex elements with many children
- Efficient for rendering multiple elements at once

---

### 3. What is Event Bubbling and how it works

Answer:
Event bubbling is when an event starts at the target element and then "bubbles up" through its parent elements, all the way to the document root.

**How it works step by step:**
1. User clicks an element (like a button)
2. The event fires on that button first
3. Then it bubbles up to the button's parent
4. Continues bubbling to grandparent, great-grandparent, etc.
5. Finally reaches the document object

**Example:**
```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```

```javascript
const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.addEventListener('click', () => console.log('Parent clicked'));
child.addEventListener('click', () => console.log('Child clicked'));
```

**What happens when you click the button:**
```
Child clicked
Parent clicked
```

The event starts at the child and bubbles up to the parent!

**In my project:**
When you click the Interview or Rejected buttons on a job card, the event fires on the button first. If we had listeners on parent containers, they would also fire due to bubbling (but we use direct onclick handlers so we control this).

---

### 4. What is Event Delegation and why it's useful

Answer:
Event delegation is attaching an event listener to a parent element instead of individual child elements. It uses event bubbling to handle events on children.

**Without delegation(inefficient):**
```javascript
const buttons = document.querySelectorAll('.delete-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', handleDelete);
});
// problem: if we add new buttons later, they won't have listeners
```

**With delegation (better):**
```javascript
const container = document.getElementById('jobs-container');
container.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) {
    handleDelete(e);
  }
});
// works for current AND future buttons!
```

**Why it's useful:**

1. **Performance** → one listener instead of many = faster
2. **Dynamic content** → works for elements added later
3. **Memory efficient** → uses less memory
4. **Cleaner code** → easier to maintain

**example:**
```javascript
// handling clicks on a list with many items
const list = document.getElementById('list');
list.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        console.log('Clicked item:', e.target.textContent);
    }
});
```

Even if you add 100 new list items later, this single listener handles them all!

**In this project:**
The tab buttons use forEach with individual listeners since there are only 3 tabs and they're static. But for job cards (which are dynamic), we use onclick attributes that call global functions - this is similar to delegation since one function handles all cards.

---

### 5. Difference between preventDefault() and stopPropagation()

Answer:
Both control event behavior, but they do completely different things.

**preventDefault()** → stops the browser's default action for that event. Does NOT stop bubbling.

**Common use:**
```javascript
// prevent form from submitting and refreshing page
const form = document.getElementById('myForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted without page reload');
    // now handle the form data 
});

// preventlink from navigating
const link = document.getElementById('myLink');
link.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Link clicked but not following URL');
});
```

**stopPropagation()** → stops the event from bubbling up to parent elements. Does NOT prevent default action.

**Example:**
```javascript
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');

overlay.addEventListener('click', () => {
    console.log('Overlay clicked - closing modal');
});

modal.addEventListener('click', (e) => {
    e.stopPropagation(); // clicking modal won't trigger overlay click
    console.log('Modal clicked - stays open');
});
```

**differences:**
- `preventDefault()` → controls WHAT happens (browser's default behavior)
- `stopPropagation()` → controls WHERE the event goes (stops bubbling)
- You can use both together if needed:

```javascript
button.addEventListener('click', (e) => {
    e.preventDefault(); // don't do default action
    e.stopPropagation(); // don't bubble to parents
});
```
