# Test for Frontend applicants

### Background

This repository contains my solution to the frontend developer test provided for job applicants by Smart Management AS. The first part of the test features a code snippet from an implemented chat room, where the task is to identify performance issues. The second part of the test is to create a React application that displays information it accesses through a provided API. The API allows authenticated users to retrieve information about items linked to specific projects, with the ability to view related events for each item.

## Task 1: Chatroom performance issues

The code snippet below shows a chatroom implementation that experiences lag when users type messages. Applicants are asked to identify sources of performance issues.

```jsx
function ChatRoom({ messages, onSendMessage }) {
  const [ text, setText ] = useState('')

  const onChange = (event) => {
    setText(event.target.value)
  }

  const onSend = () => {
    onSendMessage(text)
  }

  return (
    <Box>
      <TitleWithAnimation 
        title='Chat'
        style={{ marginBottom: '8px' }} 
      />
      <ChatMessages>
        {messages.map(message => 
          <Message 
            message={message}
            key={message.id}
          />
        )}
      </ChatMessages>
      <ChatInput
        value={text}
        onChange={onChange}
      />
      <Button onClick={onSend} />
    </Box>
  )
}
```
### Updating text state on change

The main issue with the above code is that the entire `ChatRoom` component rerenders on every new keystroke because the `text` state is updated at the top level, which includes expensive computations like rerendering animation and the full array of message components in `ChatMessages`. 

The problem can be fixed by moving the `text` state into the `ChatInput` component, so that new keystrokes only cause `ChatInput` to rerender. The `onSend` function can then be passed to `ChatInput`, allowing users to send messages from within `ChatInput`. This will stop the `ChatRoom` component from having to rerender the entire array of messages in `ChatMessages` and the title animation on every keystroke, instead only rerendering when messages are actually sent.

### Memoizing animation component

The `TitleWithAnimation` component can be memoized to prevent it from re-rendering along with `ChatRoom`. Since its props remain static, `React.memo` ensures that the component is not rerendered when messages are sent. This avoids the potentially expensive rerendering of the title animation

## Task 2: React file explorer implementation

Applicants are asked to create a simple file explorer that accesses and displays information about projects, items and events from a provided API. Users should be able to choose from a list of projects they have access to, and the application should display all items linked to the chosen project. Information about events for each item should then be possible to access.

### Architecture

The application is built with React using TypeScript, using a component-based structure to separate concerns and organize functionality. The main entry point is the `Start` component, which manages user access with the `Login` component. After successful login, different types of information are displayed through dedicated components: `ProjectList`, `ItemList`, and `EventList`. The `ProjectList`component enables project selection at all times. The `Header` component allows the user to navigate back to `ItemList` from `EventList`, and has the option to log out. 

### Declaration for API returns

The provided API returns a number of fields, where many are unnecessary for the given task. The displayed fields are determined by the requirements of the task, and the types and functions that are used from the API are described in the [declarations.d.ts](src/declarations.d.ts) file. 

The wild card event field `value` takes on a number of different types, and is listed as N/A in the application if it is an object or an array.

### Design

The application is designed for large screens, with little attention paid to mobile use due to the nature of the displayed tables. The design is minimal and functional, trying to keep the application and code as simple as possible while fulfilling the tasked requirements.