class Movies {
  constructor() {
    this.currentId = 0; //id to know what to delete
    this.moviesList = []; // list of movies for sorting

    //submit Btn
    $("#movie-form").on("submit", (evt) => {
      evt.preventDefault(); // prevent page refresh when form submits
      let title = $("#title").val();
      let rating = $("#rating").val();
      let currId = this.currentId;
      let movieData = { title, rating, currId };
      const tableRow = this.createMovieDataHTML(movieData);
      this.currentId++; //So the next movieData created has unique ID
      this.moviesList.push(movieData);
      $("#movie-table").append(tableRow); //add table row with movieData to table
      $("#movie-form").trigger("reset"); //Resets user inputs
    });

    //delBtn
    $("tbody").on("click", ".btn.del-btn", (evt) => {
      // Find index of target movie
      let idxToDel = this.moviesList.findIndex(
        (movie) => movie.currentId === +$(evt.target).data("data-id")
      );
      console.log(idxToDel);
      // delete from movies list
      this.moviesList.splice(idxToDel, 1);
      // delete from the DOM
      $(evt.target).closest("tr").remove();
    });

    //$("tbody").on("click", "");
  }
  createMovieDataHTML(data) {
    // Returns string that can be added to table in html
    return `
        <tr>
          <td>${data.title}</td>
          <td>${data.rating}</td>
          <td>
            <button class = "btn del-btn" data-id=${data.currentId}>
              Delete
            </button>
          </td>
        <tr>
      `;
  }
}

const movieClass = new Movies();
