import React from 'react'
import { NewProject } from '../Projects/NewProject'
import { ProjectList } from '../Projects/ProjectList'

export const Sidebar = () => {
    return (
        <aside className="col-md-4 bg-light pt-5">
            <h2>Proyectos</h2>
            <div className="my-2">
                <NewProject />
                <ProjectList />
            </div>
        </aside>
    )
}
