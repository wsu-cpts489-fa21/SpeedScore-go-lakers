import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CoursesMode  from './CoursesMode.js';
import CoursesTable from './CoursesTable.js';
import CourseForm from './CourseForm.js';
import FloatingButton from './FloatingButton.js'
import PopUpModal from './PopUpModal.js'

class CoursesPage extends React.Component {
    constructor(props) {
            super(props);
            this.state = {mode: CoursesMode.COURSESTABLE,
                          deleteId: -1,
                          editId: -1,
                          showPopUpModal: false,
                          showPopUpModalForRoundMethod:false};       
    }

    setMode = (newMode) => {
        this.setState({mode: newMode});
    }

    initiateEditCourse = (val) => {
        this.setState({editId: val,
                       mode: CoursesMode.EDITCOURSE}, 
                       this.props.toggleModalOpen);
    }
    
    initiateDeleteCourse = (val) => {
        console.log(val)
        this.setState({deleteId: val,
                    showPopUpModal :true   })
    }

    render() {
        const choices = {
            Confirm: () => {
                this.props.deleteCourse(this.state.deleteId);
                this.setState({showPopUpModal : false})
            },
            Cancel: () => {this.setState({showPopUpModal : false})}
        }
        switch (this.state.mode) {
        case CoursesMode.COURSESTABLE: 
            return (
                <>
                    <CoursesTable courses={this.props.courses}
                                initiateDeleteCourse={this.initiateDeleteCourse}
                                deleteCourse={this.props.deleteCourse} 
                                deleteId={this.state.deleteId}
                                initiateEditCourse= {this.initiateEditCourse}
                                updateCourse= {this.props.updateCourse}
                                setMode={this.setMode} 
                                toggleModalOpen={this.props.toggleModalOpen}
                                menuOpen={this.props.menuOpen} /> 
                    <FloatingButton
                        icon="calendar"
                        label={"Add Course"}
                        menuOpen={this.props.menuOpen}
                        action={()=>this.setState({mode: CoursesMode.ADDCOURSE},
                            this.props.toggleModalOpen)} />
                    {this.state.showPopUpModal && <PopUpModal text="Are you sure to delete?" choices={choices}/>}
            </>
            );
        case CoursesMode.ADDCOURSE:
            return (
            <CourseForm mode={this.state.mode}
                    courseData={null}
                    saveCourse={this.props.addCourse}
                    setMode={this.setMode}
                    toggleModalOpen={this.props.toggleModalOpen} />
            );
        case CoursesMode.EDITCOURSE:
            return (
            <CourseForm mode={this.state.mode}
                editId = {this.state.editId}
                courseData={this.props.courses[this.state.editId]}
                saveCourse={this.props.updateCourse}
                setMode={this.setMode}
                toggleModalOpen={this.props.toggleModalOpen} />
            );
        }
    }  

}

export default CoursesPage;