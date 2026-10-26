
const db = db.getSiblingDB("todo_db");

db.createCollection("todo_list", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            properties: {
                name: { bsonType: "string", minLength: 1, maxLength: 200 }
            }
        }
    }
})

db.createCollection("tasks", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["listId", "title", "status", "priority", "tags", "createdAt"],
            properties: {
                listId:     { bsonType: "objectId" },
                title:      { bsonType: "string", minLength: 1, maxLength: 200 },
                status:     { enum: ["pending", "in_progress", "done"] },
                priority:   { enum: ["low", "medium", "high"] },
                tags:       { bsonType: "array", items: { bsonType: "string" } },
                estimatedHours: { bsonType: ["decimal", "null"] },
                dueDate:    { bsonType: ["date", "null"] },
                createdAt:  { bsonType: "date" }
            }
        }
    }
})

