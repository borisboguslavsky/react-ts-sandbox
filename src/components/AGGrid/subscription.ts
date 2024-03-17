import Observable from "zen-observable";

export const getObservableDataSet = () => {
  return new Observable((observer) => {
    // Emit a single value after 1 second
    let timer = setTimeout(() => {
      observer.next("hello");
      observer.complete();
    }, 1000);

    // On unsubscription, cancel the timer
    return () => clearTimeout(timer);
  });
};
