import React, { useEffect, useState } from "react";

const SprintsList = (props) => {
  return (
    <div>
      ACTIVE SPRINTS
      <form>
      {props.activeSprints.map((sprint) => {
        return (
          <div>
            <input type="radio" name="sprints" value={sprint.id} onClick={() => props.onClickHandler(sprint.id)}/>
            <label>{sprint.name}</label>
          </div>
        )
      })}
      </form>
    </div>
    
  )
}

export default SprintsList