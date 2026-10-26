db.todo_list.insertOne({
    name: "casa"
})

db.todo_list.insertOne({
    name: "escuela"
})

db.todo_list.insertOne({
    name: "trabajo"
})

db.tasks.insertOne({
    listId: ObjectId('6ad96e77431e52e726050cdb'),
    title: "Barrer",
    status: "in_progress",
    priority: "medium",
    tags: ["Aburrido"],
    estimatedHours: NumberDecimal(1.5),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96e77431e52e726050cdb'),
    title: "Trapear",
    status: "pending",
    priority: "low",
    tags: ["Aburrido"],
    estimatedHours: NumberDecimal(1.5),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96e77431e52e726050cdb'),
    title: "Lavar",
    status: "pending",
    priority: "low",
    tags: ["Aburrido"],
    estimatedHours: NumberDecimal(2.3),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96e77431e52e726050cdb'),
    title: "Planchar",
    status: "pending",
    priority: "high",
    tags: [],
    estimatedHours: NumberDecimal(0.5),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96e77431e52e726050cdb'),
    title: "Cambiar foco",
    status: "pending",
    priority: "medium",
    tags: ["Tardado"],
    estimatedHours: NumberDecimal(1.2),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96e77431e52e726050cdb'),
    title: "Comprar shampoo",
    status: "pending",
    priority: "medium",
    tags: [],
    estimatedHours: NumberDecimal(0.5),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96e77431e52e726050cdb'),
    title: "Cocinar",
    status: "done",
    priority: "high",
    tags: [],
    estimatedHours: NumberDecimal(1.0),
    createdAt: new Date()
})




db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdc'),
    title: "Automatas 1",
    status: "pending",
    priority: "low",
    tags: [],
    estimatedHours: NumberDecimal(1.0),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdc'),
    title: "Automatas 2",
    status: "in_progress",
    priority: "high",
    tags: ["Tedioso"],
    estimatedHours: NumberDecimal(1.5),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdc'),
    title: "Bigdata 1",
    status: "done",
    priority: "low",
    tags: ["Confuso"],
    estimatedHours: NumberDecimal(2.1),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdc'),
    title: "Bigdata2",
    status: "done",
    priority: "low",
    tags: [],
    estimatedHours: NumberDecimal(1.0),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdc'),
    title: "IAGen 1",
    status: "done",
    priority: "low",
    tags: [],
    estimatedHours: NumberDecimal(1.5),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdc'),
    title: "Ciencia Datos",
    status: "done",
    priority: "medium",
    tags: [],
    estimatedHours: NumberDecimal(1.2),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdc'),
    title: "CienciaDatos 2",
    status: "pending",
    priority: "high",
    tags: ["Divertido"],
    estimatedHours: NumberDecimal(2.5),
    createdAt: new Date()
})




db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdd'),
    title: "bd",
    status: "pending",
    priority: "high",
    tags: [],
    estimatedHours: NumberDecimal(3.5),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdd'),
    title: "TS",
    status: "pending",
    priority: "high",
    tags: ["Confuso"],
    estimatedHours: NumberDecimal(4.0),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdd'),
    title: "HTTP",
    status: "pending",
    priority: "high",
    tags: ["Confuso"],
    estimatedHours: NumberDecimal(5.5),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdd'),
    title: "Node",
    status: "done",
    priority: "medium",
    tags: ["Confuso"],
    estimatedHours: NumberDecimal(3.0),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdd'),
    title: "pnpm",
    status: "done",
    priority: "medium",
    tags: ["Divertido"],
    estimatedHours: NumberDecimal(3.5),
    createdAt: new Date()
})

db.tasks.insertOne({
    listId: ObjectId('6ad96ebf431e52e726050cdd'),
    title: "Aclarar Dudas",
    status: "pending",
    priority: "high",
    tags: [],
    estimatedHours: NumberDecimal(1.5),
    createdAt: new Date()
})



db.tasks.find({
    listId: ObjectId('6ad96ebf431e52e726050cdc'),
    status: "pending" | "in_progress"
}).sort({
    due_date: 1
})

db.tasks.find({
    due_date: { $gt: new Date() }
})

db.todo_list.aggregate([
    {
        $lookup: {
            from: "tasks",
            localField: "_id",
            foreignField: "listId",
            as: "tareas"
        }
    },
    {
        $project: {
            nombre: 1,
            name: 1,
            totalTareas: { $size: "$tareas" },
        }
    }
])


db.tasks.aggregate([
    {
        $unwind: "$tags"
    },
    {
        $group: {
            _id: "$tags",
            total: { $sum: 1 }
        }
    },
    {
        $sort: { total: -1 }
    },
    {
        $limit: 3
    },
    {
        $project: {
            _id: 0,
            tag: "$_id",
            total: 1
        }
    }
])

db.tasks.aggregate([
  {
    $match: {
      listId: ObjectId("6ad96e77431e52e726050cdb")
    }
  },
  {
    
    $group: {
      _id: "$status",
      total: { $sum: 1 }
    }
  },
  {

    $project: {
      _id: 0,
      estado: "$_id",
      total: 1
    }
  }
]);



db.tasks.insertOne({
    listId: '6ad96ebf431e52e726050cdc',
    title: "Bigdata2",
    status: "done",
    priority: "low",
    tags: [],
    estimatedHours: NumberDecimal(1.0),
    createdAt: new Date()
})


db.tasks.find({
  listId: ObjectId("6ad96e77431e52e726050cdb"),
  status: "pending"
}).explain("executionStats");

db.tasks.createIndex(
  { listId: 1, status: 1 },
  { name: "idx_listId_status" }
);


db.prueba.insertOne({
    horas: 5,
    horas_2: NumberInt(5),
    horas_3: NumberDecimal(5) 
});


db.prueba.aggregate([
  {
    $project: {
        tipo_dato1: { $type: "$horas" },
        tipo_dato2: { $type: "$horas_2" },
        tipo_dato3: { $type: "$horas_3" }
    }
  } 
])