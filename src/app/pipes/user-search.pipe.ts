import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(user:User[], searchString:string): User[] {
    searchString = searchString? searchString.toLocaleLowerCase():'';
    return searchString?
      user.filter(x=>x.firstName.toLocaleLowerCase().indexOf(searchString)!=-1||
                  x.lastName.toLocaleLowerCase().indexOf(searchString)!=-1||
                  x.email.toLocaleLowerCase().indexOf(searchString)!=-1):
      user;

  }

}
