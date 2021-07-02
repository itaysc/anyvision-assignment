Assumptions made while writing the code

1. When inserting a filter predicate, I assumed that the input is a valid predicate that looks
   something like "x > 1" (Pay attention that I expect only the predicate/method body and not a function like "x=>x>1")
   

2. From the instructions I assume that the "fold-sum" and "fold-median" events must come after a "fixed-event-window" event,
   otherwise they don't mean anything and also the "fixed-event-window" value will not mean anything.

3. The linereader will ignore non-numerical values during pipeline initialization.

