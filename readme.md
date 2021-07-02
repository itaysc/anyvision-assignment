# Anyvision home assignment
## Created by Itay Schmidt

**Assumptions made while writing the code**

1. When inserting a filter predicate, I assumed that the input is a valid predicate that looks
   something like "x > 1" (Pay attention that I expect only the predicate/method body and not a function like "x=>x>1")
   

2. From the instructions I assume that the "fold-sum" and "fold-median" events must come after a "fixed-event-window" event,
   otherwise they don't mean anything and also the "fixed-event-window" value will not mean anything.

3. The linereader will ignore non-numerical values during pipeline initialization.

4. The user will press "enter" whenever he finished typing the input so the linereader will consume it.
## How to run
**There are couple of options for you to run the code.**
1. **Manually**
   *  First run ```npm install``` in order to install all necessary dependencies.
   *  Build the code using ```npm run build``` or ```yarn build```.
   *  Run the code using ```npm run start``` or ```yarn start```.
2. **Using Docker**
   * From the project's root directory you can run the command ```bash build-and-run.sh```, this will activate a script that will build and run the docker container for you.
   * you can also build and run it yourself using ```docker build -t pipeline .``` to build the container and then ```docker run -a stdin -a stdout -i pipeline``` to run it.
