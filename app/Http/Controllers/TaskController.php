<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

use function GuzzleHttp\Promise\task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Project $project)
    {
        if (!$project->isOwner(auth()->user()->id)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $tasks = $project->tasks;
        return response()->json(['data' => $tasks]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Project $project)
    {
        $request->validate(['name' => 'required|string']);
        if (!$project->isOwner(auth()->user()->id)) {
            return response()->json(['message' => 'only owner can delete the project'], 401);
        }
        $task = Task::create([
            'name' => $request->name,
            'project_id' => $project->id,
            'done' => false
        ]);
        return response()->json(['data' => ['task' => $task]], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project, Task $task)
    {
        if (!$project->isOwner(auth()->user()->id)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        if ($task->project_id !== $project->id) {
            return response()->json(['message' => 'Task not found for this project'], 404);
        }
        return response()->json(['data' => ['task' => $task]]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project, Task $task)
    {
        $request->validate(['name' => 'string', 'done' => 'boolean']);
        if (!$project->isOwner(auth()->user()->id)) {
            return response()->json(['message' => 'only owner can delete the project'], 401);
        }
        if ($task->project_id !== $project->id) {
            return response()->json(['message' => 'Task not found for this project'], 404);
        }
        $task->fill($request->only('name', 'done'));
        if (!$task->isDirty()) {
            return response()->json(['message' => 'PUT without changes'], 409);
        }
        $task->save();
        $task->refresh();
        return response()->json(['data' => ['task' => $task]]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project, Task $task)
    {
        if (!$project->isOwner(auth()->user()->id)) {
            return response()->json(['message' => 'only owner can delete the project'], 401);
        }
        if ($task->project_id !== $project->id) {
            return response()->json(['message' => 'Task not found for this project'], 404);
        }
        $task->delete();
        return response()->json([], 204);
    }
}
