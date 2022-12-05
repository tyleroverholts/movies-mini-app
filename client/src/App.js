import './App.css';

function App() {
  const movies = [
    {title: 'Mean Girls'},
    {title: 'Hackers'},
    {title: 'The Grey'},
    {title: 'Sunshine'},
    {title: 'Ex Machina'}
  ]
  return (
    <div className="App">
      {movies.map(movie =>
        <p>{movie.title}</p>
      )}
    </div>
  );
}

export default App;
