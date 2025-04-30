// ... existing code ...
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Frontend dev server
  credentials: true
}));
// ... existing code ...