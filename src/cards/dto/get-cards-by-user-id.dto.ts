import { IsNotEmpty, IsUUID } from 'class-validator';
import { User } from 'src/models/user.model';

export class GetCardsByUserIdDto implements Pick<User, 'id'> {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
