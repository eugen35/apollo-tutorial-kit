**Experiments with nested mutations**

# Target
I'm looking for a standard API for nested mutations, similar to queries (see https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035).

I did not find a standard way in graphql for this. **But I think it should be!**. The same obvious advantage!

## I need something like this:

**variant 1**

resolver:
```
Mutation: {
    addAction(_, args) { return Action.create(args.input) }, // And related to Action Responsible (Person) is created automatically - @see AddAction
    addActionPlan(_, args) { return ActionPlan.create(args.input) }, // And related Actions and related to Actions Responsibles (Persons) are created automatically - @see AddActionPlan and AddActions
  },
AddAction: {
    addResponsible(action, args) {
          return Person.create(args).then((person) => {
            return action.setPerson(person);
          });
    }
},
  AddActionPlan: {
    addActions(actionPlan, args) {
      return Action.bulkCreate(args); // And related to Actions Responsibles (Persons) are created automatically - @see AddAction
    },
  },
```

**variant 2 (At the worst)**
if in resolvers it is not possible, so in the Query Level:
```
mutation {
    addActionPlan(input:{
        isApproved: false,
        actions: AddActions(input: [
            { description: "????", responsible: AddResonsible (input: { firstName: "John" }) },
            { description: "???", responsible: AddResponsible (input: { firstName: "Ivan" }) },
        ])
    })
    {
        id
        isApproved
        actions {
            description
            responsible {
                firstName
            }
        }
    }
}
```

Where in the shema are mutations: addActionPlan, AddActions, AddResponsible.

# Analogs
I have found only this: https://hackernoon.com/graphql-nested-mutations-with-apollo-small-fatigue-max-gain-1020f627ea2e
https://blog.graph.cool/improving-dx-with-nested-mutations-698c508339ca
But there is nested mutations only for 3 levels.

# About this repo

## Getting started



Then open [http://localhost:3000/graphiql](http://localhost:3000/graphql)

## Examples of mutations:

2 levels:
```
mutation {addAction(input:{
  description:"+++++++++repa112-------------",
  type: BLOCKING_ACTION
  responsible: {firstName: "++++++++++------------Va12221sya"}
}){description id type responsible {firstName}}}
```

3 levels:
```
mutation {addActionPlan(input:{isApproved: false, actions:[
  {description: "????", responsible: {firstName: "John"}}, {description: "???", responsible: {firstName: "Ivan"}},
]})
  {id isApproved actions {description responsible {firstName}}}
}
```


