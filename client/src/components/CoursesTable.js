import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CoursesTable extends React.Component {

  renderTable = () => {
    const table = [];
    for (let r = 0; r < Object.keys(this.props.courses).length; ++r) {
      table.push(
        <tr key={r}>
          <td>{this.props.courses[r].courseName}</td>
          <td>{this.props.courses[r].address}</td>
          <td><button id={'editBtn' + r} onClick={this.props.menuOpen ? null : () => 
                  this.props.initiateEditCourse(r)}>
                <FontAwesomeIcon icon="eye"/> 
                <FontAwesomeIcon icon="edit"/> 
              </button></td>
          <td><button id={'delBtn' + r}onClick={this.props.menuOpen ? null : 
            () => this.props.initiateDeleteCourse(r)}>
                <FontAwesomeIcon icon="trash"/>
              </button></td>
        </tr> 
      );
    }
    return table;
  }

    render() {
      console.log(this.props.courses)
      console.log(Object.keys(this.props.courses).length)
      return(
        <div id="coursesModeTab" className="mode-page" role="tabpanel"
            aria-label="Courses Tab" tabIndex="0">
        <h1 className="mode-page-header">Courses</h1>
        <table id="coursesTable" className="table table-hover caption-top">
          <caption id="coursesTableCaption" aria-live="polite">
            {"There are total " + Object.keys(this.props.courses).length  + " speedgolf courses" + 
              (Object.keys(this.props.courses).length !== 1 ? "s" : "")}
          </caption>
          <thead className="table-light">
            <tr>
            <th scope="col" role="columnheader" 
                className="sortable-header cell-align-middle" 
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by name">
                  <FontAwesomeIcon icon="sort" /> 
                </button>Name
            </th>
            <th scope="col" role="columnheader" 
                className="sortable-header cell-align-middle" 
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by address">
                  <FontAwesomeIcon icon="sort" /> 
                </button>Address 
            </th>
            {/* <th scope="col" role="columnheader"
                className="sortable-header cell-align-middle"
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by score">
                  <FontAwesomeIcon icon="sort" />
                </button>Score
            </th> */}
            <th scope="col" className="cell-align-middle">
              View/Edit...
            </th>
            <th scope="col" className="cell-align-middle">
              Delete
            </th>
            </tr>
          </thead>
          <tbody>
            {this.props.courses === null || Object.keys(this.props.courses).length === 0 ? 
              <tr>
                <td colSpan="4" scope="rowgroup"><i>No courses shown</i></td>
              </tr> : this.renderTable()
            }
          </tbody>
        </table>        
      </div>
      );
    }   
}

export default CoursesTable;