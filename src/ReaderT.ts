/**
 * @since 3.0.0
 */

import { Apply, Apply1, Apply2 } from './Apply'
import { flow, pipe } from './function'
import { Functor, Functor1, Functor2 } from './Functor'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad2, Monad1, Monad } from './Monad'
import { Pointed2, Pointed1, Pointed } from './Pointed'
import { Reader } from './Reader'

/**
 * @since 3.0.0
 */
export function of_<F extends URIS2>(F: Pointed2<F>): <A, R, ME>(a: A) => Reader<R, Kind2<F, ME, A>>
export function of_<F extends URIS>(F: Pointed1<F>): <A, R>(a: A) => Reader<R, Kind<F, A>>
export function of_<F>(F: Pointed<F>): <A, R>(a: A) => Reader<R, HKT<F, A>>
export function of_<F>(F: Pointed<F>): <A, R>(a: A) => Reader<R, HKT<F, A>> {
  return (a) => () => F.of(a)
}

/**
 * @since 3.0.0
 */
export function map_<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <R, FE>(fa: Reader<R, Kind2<F, FE, A>>) => Reader<R, Kind2<F, FE, B>>
export function map_<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, Kind<F, A>>) => Reader<R, Kind<F, B>>
export function map_<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, HKT<F, A>>) => Reader<R, HKT<F, B>>
export function map_<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, HKT<F, A>>) => Reader<R, HKT<F, B>> {
  return (f) => (fa) => flow(fa, F.map(f))
}

/**
 * @since 3.0.0
 */
export function ap_<F extends URIS2>(
  F: Apply2<F>
): <R, E, A>(
  fa: Reader<R, Kind2<F, E, A>>
) => <B>(fab: Reader<R, Kind2<F, E, (a: A) => B>>) => Reader<R, Kind2<F, E, B>>
export function ap_<F extends URIS>(
  F: Apply1<F>
): <R, A>(fa: Reader<R, Kind<F, A>>) => <B>(fab: Reader<R, Kind<F, (a: A) => B>>) => Reader<R, Kind<F, B>>
export function ap_<F>(
  F: Apply<F>
): <R, A>(fa: Reader<R, HKT<F, A>>) => <B>(fab: Reader<R, HKT<F, (a: A) => B>>) => Reader<R, HKT<F, B>>
export function ap_<F>(
  F: Apply<F>
): <R, A>(fa: Reader<R, HKT<F, A>>) => <B>(fab: Reader<R, HKT<F, (a: A) => B>>) => Reader<R, HKT<F, B>> {
  return (fa) => (fab) => (r) => F.ap(fa(r))(fab(r))
}

/**
 * @since 3.0.0
 */
export function chain_<M extends URIS2>(
  M: Monad2<M>
): <A, R, E, B>(f: (a: A) => Reader<R, Kind2<M, E, B>>) => (ma: Reader<R, Kind2<M, E, A>>) => Reader<R, Kind2<M, E, B>>
export function chain_<M extends URIS>(
  M: Monad1<M>
): <A, R, B>(f: (a: A) => Reader<R, Kind<M, B>>) => (ma: Reader<R, Kind<M, A>>) => Reader<R, Kind<M, B>>
export function chain_<M>(
  M: Monad<M>
): <A, R, B>(f: (a: A) => Reader<R, HKT<M, B>>) => (ma: Reader<R, HKT<M, A>>) => Reader<R, HKT<M, B>>
export function chain_<M>(
  M: Monad<M>
): <A, R, B>(f: (a: A) => Reader<R, HKT<M, B>>) => (ma: Reader<R, HKT<M, A>>) => Reader<R, HKT<M, B>> {
  return (f) => (ma) => (r) =>
    pipe(
      ma(r),
      M.chain((a) => f(a)(r))
    )
}

/**
 * @since 3.0.0
 */
export function ask_<F extends URIS2>(F: Pointed2<F>): <R, E>() => Reader<R, Kind2<F, E, R>>
export function ask_<F extends URIS>(F: Pointed1<F>): <R>() => Reader<R, Kind<F, R>>
export function ask_<F>(F: Pointed<F>): <R>() => Reader<R, HKT<F, R>>
export function ask_<F>(F: Pointed<F>): <R>() => Reader<R, HKT<F, R>> {
  return () => F.of
}

/**
 * @since 3.0.0
 */
export function asks_<F extends URIS2>(F: Pointed2<F>): <R, A, E>(f: (r: R) => A) => Reader<R, Kind2<F, E, A>>
export function asks_<F extends URIS>(F: Pointed1<F>): <R, A>(f: (r: R) => A) => Reader<R, Kind<F, A>>
export function asks_<F>(F: Pointed<F>): <R, A>(f: (r: R) => A) => Reader<R, HKT<F, A>>
export function asks_<F>(F: Pointed<F>): <R, A>(f: (r: R) => A) => Reader<R, HKT<F, A>> {
  return (f) => flow(f, F.of)
}

/**
 * @since 3.0.0
 */
export function fromReader_<F extends URIS2>(F: Pointed2<F>): <R, A, E>(ma: Reader<R, A>) => Reader<R, Kind2<F, E, A>>
export function fromReader_<F extends URIS>(F: Pointed1<F>): <R, A>(ma: Reader<R, A>) => Reader<R, Kind<F, A>>
export function fromReader_<F>(F: Pointed<F>): <R, A>(ma: Reader<R, A>) => Reader<R, HKT<F, A>>
export function fromReader_<F>(F: Pointed<F>): <R, A>(ma: Reader<R, A>) => Reader<R, HKT<F, A>> {
  return (ma) => flow(ma, F.of)
}
