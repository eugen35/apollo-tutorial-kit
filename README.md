Experiments with nested mutations

## Getting started

```sh
git clone https://github.com/eugen35/apollo-tutorial-kit.git
cd apollo-starter-kit
npm install
npm run seeddb
npm run start
```

Then open [http://localhost:3000/graphiql](http://localhost:3000/graphql)

Examples of mutations:

2 levels:
```
mutation {addActionPlan(input:{isApproved: false, actions:[
  {description: "????", responsible: {firstName: "John"}}, {description: "???", responsible: {firstName: "Ivan"}},
]})
  {id isApproved actions {description responsible {firstName}}}
}
```

3 levels:
```
mutation {addActionPlan(input:{isApproved: false, actions:[
  {description: "????", responsible: {firstName: "John"}}, {description: "???", responsible: {firstName: "Ivan"}},
]})
  {id isApproved actions {description responsible {firstName}}}
}
```


