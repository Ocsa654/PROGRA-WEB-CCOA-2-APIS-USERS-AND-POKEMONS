import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private userApiUrl = 'https://api.escuelajs.co/api/v1/users';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 10, offset: number = 0): Observable<{ pokemons: Pokemon[], total: number }> {
    return this.http.get<any>(`${this.pokemonApiUrl}?limit=${limit}&offset=${offset}`).pipe(
      map((response) => ({
        pokemonUrls: response.results as { name: string, url: string }[],
        total: response.count as number,
      })),
      switchMap((result) =>
        forkJoin(
          result.pokemonUrls.map((pokemon) => 
            this.http.get<Pokemon>(pokemon.url)
          )
        ).pipe(
          map((pokemons: Pokemon[]) => ({
            pokemons: pokemons,
            total: result.total,
          }))
        )
      )
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
  }
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/auth/current-user`);
  }

}