<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = auth()->user()->projects;
        return response()->json(['projects' => $projects]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);
        $newProject = Project::create(
            ['name' => $request->name, 'user_id' => auth()->user()->id]
        );
        return response()->json(['project' => $newProject], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        if (!$project->isOwner(auth()->user()->id)) {
            return response()->json(['message' => 'only owner can update the project'], 401);
        }
        return response()->json(['data' => ['project' => $project]]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        $project->fill($request->only('name'));
        if (!$project->isOwner(auth()->user()->id)) {
            return response()->json(['message' => 'only owner can update the project'], 401);
        }
        if (!$project->isDirty()) {
            return response()->json(['message' => 'PUT without changes'], 409);
        }
        $project->save();
        $project->refresh();
        return response()->json(['data' => ['project' => $project]]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        if (!$project->isOwner(auth()->user()->id)) {
            return response()->json(['message' => 'only owner can delete the project'], 401);
        }
        $project->delete();
        return response()->json([], 204);
    }
}
