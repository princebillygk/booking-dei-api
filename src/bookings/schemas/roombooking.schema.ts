import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
} from 'class-validator';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export enum RoomBookingStatus {
  BOOKED = 'BOOKED',
  CHECKEDIN = 'CHECKEDIN',
  CHECKEDOUT = 'CHECKEDOUT',
  CANCELLED = 'CANCELLED',
}

// Register the enum with GraphQL
registerEnumType(RoomBookingStatus, {
  name: 'RoomBookingStatus',
  description: 'Room booking status for a booking',
});

@ObjectType()
@Schema({ timestamps: true })
export class RoomBooking {
  @Field(() => ID, { description: 'Unique identifier for the room booking' })
  @IsMongoId()
  _id: ObjectId;

  @Field({ description: 'Check-in date of the Room booking' })
  @Prop({ required: true })
  @IsDate()
  checkIn: Date;

  @Field({ description: 'Check-out date of the Room booking' })
  @Prop({ required: true })
  @IsDate()
  checkOut: Date;

  @Field({ description: 'Room rent for the booking' })
  @Prop({ required: true })
  @IsNumber()
  rent: number;

  @Field({ nullable: true, description: 'Discount for the booking' })
  @Prop()
  @IsNumber()
  @IsOptional()
  discount?: number;

  @Field({ description: 'Extra bed for the booking' })
  @Prop({ required: true, default: false })
  @IsBoolean()
  extraBed: boolean;

  @Field({ description: 'Extra breakfast for the booking' })
  @Prop({ required: true, default: false })
  @IsBoolean()
  extraBreakfast: boolean;

  @Field(() => ID, { description: 'Room where the booking were generated' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  })
  @IsMongoId()
  room: ObjectId;

  @Field(() => ID, { description: 'Unique identifier for the booking' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  })
  @IsMongoId()
  booking: ObjectId;

  @Field(() => ID, { description: 'Hotel where the booking were generated' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  })
  @IsMongoId()
  hotel: ObjectId;

  @Field(() => RoomBookingStatus, {
    description: 'Room booking status of the booking',
  })
  @Prop({ required: true, enum: RoomBookingStatus })
  @IsEnum(RoomBookingStatus)
  status: RoomBookingStatus;
}

export type RoomBookingDocument = HydratedDocument<RoomBooking>;
export const RoomBookingSchema = SchemaFactory.createForClass(RoomBooking);
