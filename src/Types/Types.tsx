export type Either<L, R> = Left<L> | Right<R>
export type Right<T> = {kind : "Right", right : T}
export type Left<T> = {kind : "Left", left : T}

export const Right = <T extends {}>(value : T) : Right<T> => {return {kind : "Right", right : value}}
export const Left = <T extends {}>(value : T) : Left<T> => {return {kind: "Left", left : value}}

export type Maybe<T> = Just<T> | Nothing
export type Just<T> = {kind: "Just", just : T}
export type Nothing = {kind: "Nothing"}

export const Just = <T extends {}>(value : T) => {return {kind: "Just", just: value}}
export const Nothing = () => {return {kind: "Nothing"}};

export type Result<T, E extends Error> = {kind: "Loading"} | {kind: "Done", result?: T} | {kind: "Error", error: E};

// TODO PLAYGROUND

const dostuff = (val : Either<Error, string>) : string => {

  switch(val.kind){
    case "Right": {
      return val.right.length.toString();
    }
    case "Left": {
      return val.left.message;
    }
  }
}

const getStuff = () => {
  const letMe = Right("hejhej");

  dostuff(letMe);
}
