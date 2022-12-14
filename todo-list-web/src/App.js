import {CssBaseline} from "@mui/material";
import {ThemeProvider, createTheme} from "@mui/material";

import Todo from "./compoents/Todo";

function App() {
    const theme = createTheme({palette:{mode:'dark'}})

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Todo/>
        </ThemeProvider>
    );
}

export default App;
